/*
 * Multiplayer masking shim — loads before every game script.
 *
 * The Colyseus flow talks straight to onrushstats hosts: an HTTPS matchmaking
 * call to a region host (hp1 / hpus1 / hpas1) that hands back a per-node
 * publicAddress (hp24, hpus10, ...), then a gameplay WebSocket direct to that
 * node. Both would leak this site's link to those servers. This shim rewrites
 * every onrushstats request to a same-origin proxy path so the browser only
 * ever talks to this domain; nginx forwards server-side and clears the
 * identifying headers (see /hap-mm/ and /hap-mp/ in the nginx config).
 *
 *   https://<host>.onrushstats.com/...  ->  /hap-mm/<host>.onrushstats.com/...
 *   wss://<host>.onrushstats.com/...    ->  /hap-mp/<host>.onrushstats.com/...
 *
 * Loaded first in <head>, so Colyseus captures the patched WebSocket/fetch.
 */
(function () {
    var HOST_RE = /^(wss?|https?):\/\/([a-z0-9-]+\.onrushstats\.com)(\/[\s\S]*)?$/i;

    function rewrite(url) {
        if (typeof url !== 'string') return url;
        var m = url.match(HOST_RE);
        if (!m) return url;
        var scheme = m[1].toLowerCase();
        var host = m[2];
        var rest = m[3] || '';
        if (scheme === 'ws' || scheme === 'wss') {
            var wsScheme = (location.protocol === 'https:') ? 'wss://' : 'ws://';
            return wsScheme + location.host + '/hap-mp/' + host + rest;
        }
        return location.origin + '/hap-mm/' + host + rest;
    }

    // --- WebSocket (gameplay) ---------------------------------------------
    var NativeWS = window.WebSocket;
    if (NativeWS) {
        var WrappedWS = function (url, protocols) {
            return new NativeWS(rewrite(url), protocols);
        };
        WrappedWS.prototype = NativeWS.prototype;
        ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (k) {
            try { WrappedWS[k] = NativeWS[k]; } catch (e) {}
        });
        window.WebSocket = WrappedWS;
    }

    // --- fetch (matchmaking) ----------------------------------------------
    var nativeFetch = window.fetch;
    if (nativeFetch) {
        window.fetch = function (input, init) {
            if (typeof input === 'string') {
                input = rewrite(input);
            } else if (input && typeof input.url === 'string') {
                var r = rewrite(input.url);
                if (r !== input.url) input = new Request(r, input);
            }
            return nativeFetch.call(this, input, init);
        };
    }

    // --- XMLHttpRequest (matchmaking fallback) ----------------------------
    var nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (typeof url === 'string') {
            arguments[1] = rewrite(url);
        }
        return nativeOpen.apply(this, arguments);
    };
})();
