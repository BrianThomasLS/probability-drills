var PokiPlugin = {
    adblock: false,
    isPaused: false,
    canShowAds: false,
    isGamePaused: false,
    isAlreadyLoaded: false,
    isAdsPlaying : false,
    lastPauseTime : -1,
    midrollInterval: 60 * 5,
    totalGameplay: 0,
    init: function () {
        if (window.admob) {
            PokiPlugin.onLoad();
            return false;
        }

        var isMobile = Utils.getURLParam('isMobile');

        if (isMobile) {
            console.log('It works in mobile application wrapper, PokiSDK wont be working');

            return false;
        }

        var style = document.createElement('style');
        style.innerHTML = '#application-console{ display:none; }'
        document.head.appendChild(style);

        var script = document.createElement('script');
        script.src = 'poki-sdk.js';
        script.onload = function () {
            PokiPlugin.onLoad();
        };

        document.head.append(script);
    },
    onLoad: function () {
        var isLocalHost = /^(localhost|127\.0\.0\.1)$/i.test(location.hostname);
        var isPokiPreview = /poki\.com\/[a-z-]+\/preview\//i.test(document.referrer || '');
        var pokiDebug = isLocalHost || isPokiPreview || Utils.getURLParam('pokiDebug') === '1';
        PokiSDK.init({ debug: pokiDebug, volume: 0.35 }).then(function () {
            console.log('PokiSDK Loaded! (debug=' + pokiDebug + ', ref=' + document.referrer + ')');
            PokiPlugin.loadCompleted();
            PokiPlugin.canShowAds = true;
        }).catch(function () {
            PokiPlugin.adblock = true;
            PokiPlugin.loadCompleted();
            console.log('Initialized, but the user likely has adblock');
        });

        setInterval(function () {
            PokiPlugin.tick();
        }, 1000);
    },
    tick: function () {
        if (!this.isGamePaused) {
            this.totalGameplay++;
        }
    },
    loadCompleted: function () {
        if (this.isAlreadyLoaded) {
            return false;
        }

        //requested to fire after load complete
        PokiSDK.gameLoadingFinished();

        //has been requested by Poki to trigger commercial before gameplay
        //PokiPlugin.showMidroll();
        //PokiPlugin.playGame();

        this.isAlreadyLoaded = true;
    },
    onPause: function () {
        if (this.isGamePaused) {
            return false;
        }

        if(this.isAdsPlaying){
            return;
        }

        if (typeof PokiSDK !== 'undefined') {
            PokiSDK.gameplayStop();
            console.log('[DEBUG] Gameplay stop: onPause', this.isGamePaused);
        }

        this.isGamePaused = true;
        this.lastPauseTime = Date.now();
    },
    pauseGame: function () {
        if (typeof pc !== 'undefined') {
            pc.app.timeScale = 0;
            PokiPlugin.isPaused = true;

            pc.app.fire('Player:Stop');
            pc.app.fire('Gameplay:Pause');
        }

        PokiPlugin.onPause();
    },
    onPlay: function () {
        if (!this.isGamePaused) {
            return false;
        }

        if(this.isAdsPlaying){
            return;
        }

        if (typeof PokiSDK !== 'undefined') {
            PokiSDK.gameplayStart();
            console.log('[DEBUG] Gameplay start: onPlay', this.isGamePaused);
        }

        this.lastGameplayStart = Date.now();
        this.isGamePaused = false;
    },
    firstGameplayEvent: function () {
        if (this.isAlreadyTriggered) {
            return false;
        }

        if (typeof PokiSDK !== 'undefined') {
            PokiSDK.gameplayStart();
            console.log('[DEBUG] Gameplay start: firstGameplayEvent', this.isAlreadyTriggered);
        }

        this.lastGameplayStart = Date.now();
        this.isAlreadyTriggered = true;
    },
    playGame: function () {
        if (typeof pc !== 'undefined') {
            pc.app.timeScale = 1;
            PokiPlugin.isPaused = false;

            pc.app.fire('Gameplay:Play');
        }
    },
    showMidroll: function (callback) {
        console.log('[DEBUG] Midroll triggered');
        Utils.addAdsEvent();

        console.log('[DEBUG] pointer lock triggered');
        pc.app.mouse.disablePointerLock();

        if (typeof PokiSDK !== 'undefined') {
            PokiPlugin.pauseGame();

            PokiPlugin.isAdsPlaying = true;
            console.log('[DEBUG] commercial break triggered');
            PokiSDK.commercialBreak().
                then(function (success) {
                    if (callback) {
                        callback(success);
                    }

                    PokiPlugin.isAdsPlaying = false;
                    PokiPlugin.playGame();
                }).catch(function (err) {
                    console.warn('[PokiPlugin] commercialBreak failed:', err);
                    if (callback) {
                        callback(false);
                    }
                    PokiPlugin.isAdsPlaying = false;
                    PokiPlugin.playGame();
                });
        } else {
            if (callback) {
                callback();
            }
        }
    },
    showMidrollWithNoLock: function (callback) {
        console.log('[DEBUG] Midroll triggered');
        Utils.addAdsEvent();

        console.log('[DEBUG] pointer lock triggered');
        pc.app.mouse.disablePointerLock();

        if (typeof PokiSDK !== 'undefined') {
            PokiPlugin.pauseGame();

            console.log('[DEBUG] commercial break triggered');
            PokiPlugin.isAdsPlaying = true;
            PokiSDK.commercialBreak().
                then(function (success) {
                    if (callback) {
                        callback(success);
                    }

                    PokiPlugin.isAdsPlaying = false;
                }).catch(function (err) {
                    console.warn('[PokiPlugin] commercialBreak failed:', err);
                    if (callback) {
                        callback(false);
                    }
                    PokiPlugin.isAdsPlaying = false;
                });
        } else {
            if (callback) {
                callback();
            }
        }
    },
    showConditionedMidroll: function (callback) {
        if (typeof PokiSDK !== 'undefined') {
            if (
                PokiPlugin.totalGameplay >= PokiPlugin.midrollInterval
            ) {
                PokiPlugin.showMidroll(function () {
                    if (callback) {
                        callback();
                    }
                });

                PokiPlugin.totalGameplay = 0;
            } else {
                if (callback) {
                    callback();
                }
            }
        } else {
            if (callback) {
                callback();
            }
        }
    },
    showReward: function (callback, options) {
        Utils.addAdsEvent();

        if (PokiPlugin.adblock) {
            if (typeof pc !== 'undefined') {
                pc.app.fire('Overlay:Adblock');
            }

            return false;
        }

        if (!PokiPlugin.canShowAds) {
            if (typeof pc !== 'undefined') {
                pc.app.fire('Overlay:Adblock');
            }
            return false;
        }

        if (options && options.disableEvents) {
            //events disabled
            console.log('Events disabled');
        } else {
            PokiPlugin.pauseGame();
        }

        pc.app.mouse.disablePointerLock();
        
        PokiPlugin.isAdsPlaying = true;
        PokiSDK.rewardedBreak().
            then(function (success) {
                if (success) {
                    callback(success);
                }

                PokiPlugin.isAdsPlaying = false;

                if (options && options.disableEvents) {
                    console.log('Events disabled');
                    //events disabled
                } else {
                    PokiPlugin.playGame();
                }
            }).catch(function (err) {
                console.warn('[PokiPlugin] rewardedBreak failed:', err);
                PokiPlugin.isAdsPlaying = false;
                if (!(options && options.disableEvents)) {
                    PokiPlugin.playGame();
                }
            });

        PokiPlugin.totalGameplay = 0;
    },
    largeShowReward: function (callback, options) {
        Utils.addAdsEvent();

        if (PokiPlugin.adblock) {
            if (typeof pc !== 'undefined') {
                pc.app.fire('Overlay:Adblock');
            }

            return false;
        }

        if (!PokiPlugin.canShowAds) {
            if (typeof pc !== 'undefined') {
                pc.app.fire('Overlay:Adblock');
            }
            return false;
        }

        if (options && options.disableEvents) {
            //events disabled
            console.log('Events disabled');
        } else {
            PokiPlugin.pauseGame();
        }

        pc.app.mouse.disablePointerLock();

        PokiSDK.rewardedBreak({
            size: 'large'
        }).then(function (success) {
            if (success) {
                callback(success);
            }

            if (options && options.disableEvents) {
                console.log('Events disabled');
                //events disabled
            } else {
                PokiPlugin.playGame();
            }
        }).catch(function (err) {
            console.warn('[PokiPlugin] rewardedBreak (large) failed:', err);
            if (!(options && options.disableEvents)) {
                PokiPlugin.playGame();
            }
        });

        PokiPlugin.totalGameplay = 0;
    },
    shareableURL: function (params, callback) {
        PokiSDK.shareableURL(params).then(url => {
            callback(url);
        }).catch(function (err) {
            console.warn('[PokiPlugin] shareableURL failed:', err);
        });
    }
};

//dom loaded
document.addEventListener('DOMContentLoaded', function () {
    PokiPlugin.init();
});

/*
window.addEventListener('mousemove', function(ev){
    PokiPlugin.firstGameplayEvent();
});
*/

window.addEventListener('mousedown', function (ev) {
    PokiPlugin.firstGameplayEvent();
});

window.addEventListener('keydown', function (ev) {
    PokiPlugin.firstGameplayEvent();

    if (['ArrowDown', 'ArrowUp', ' '].includes(ev.key)) {
        ev.preventDefault();
    }
});

window.addEventListener('wheel', function (ev) {
    ev.preventDefault()
}, { passive: false });

//disable context
/*
window.addEventListener('contextmenu', function(ev){
    ev.preventDefault();
});
*/