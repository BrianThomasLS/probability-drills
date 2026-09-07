var Utils = {
    version: 'v9',
    dataVersion: 'v9',
    gameName: 'race_simulator',
    shortName: 'race_simulator',
    generateUsername: function () {
        var variation0 = ['Sneaky', 'Hidden', 'Masked', 'Clever', 'Silent', 'Secret', 'Camouflaged', 'Quick', 'Tricky', 'Shadow', 'Invisible', 'Slippery', 'Mischievous', 'Stealthy'];
        var variation1 = ['Painter', 'Brush', 'Sprayer', 'Roller', 'Splasher', 'Stainer', 'Tagger', 'Dripper', 'Colorer', 'Blender', 'Doodler', 'Graffiti', 'Inkster', 'Camouflager'];
        var numbers = ['1', '00', '99', 'e', '--', 'OO', '12', '07', '32', '', '', '', '', '', '', '', '', ''];

        if (Math.random() > 0.5) {
            return Utils.getRandom(variation0) + ' ' + Utils.getRandom(variation1);
        } else if (Math.random() > 0.5) {
            return Utils.getRandom(variation1) + Utils.getRandom(numbers);
        } else {
            return Utils.getRandom(variation0) + Utils.getRandom(numbers);
        }
    },
    parseFloat: function (number) {
        return parseFloat(parseFloat(number).toFixed(1)) * 5;
    },
    lookAt: function (x0, y0, x1, y1) {
        return Math.atan2(x1 - x0, y1 - y0);
    },
    generateUUID: function () {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },
    generateRoomId: function () {
        return "10000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },
    generateUserId: function () {
        const randomValues = new Uint8Array(16);
        crypto.getRandomValues(randomValues);

        const hashArray = Array.from(randomValues).map(byte => byte.toString(16).padStart(2, '0'));
        const hash = hashArray.join('').substr(0, 32);

        return hash;
    },
    numberScale: function (number) {
        if (number >= 1e15) {
            return (number / 1e15).toFixed(1) + 'Q'; // Quadrillions
        } else if (number >= 1e12) {
            return (number / 1e12).toFixed(1) + 'T'; // Trillions
        } else if (number >= 1e9) {
            return (number / 1e9).toFixed(1) + 'B'; // Billions
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M'; // Millions
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(1) + 'K'; // Thousands
        } else {
            return number.toString(); // Less than 1000
        }
    },
    numberScaleWithoutFloat: function (number) {
        if (number >= 1e15) {
            return (number / 1e15).toFixed(0) + 'Q'; // Quadrillions
        } else if (number >= 1e12) {
            return (number / 1e12).toFixed(0) + 'T'; // Trillions
        } else if (number >= 1e9) {
            return (number / 1e9).toFixed(0) + 'B'; // Billions
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(0) + 'M'; // Millions
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + 'K'; // Thousands
        } else {
            return number.toString(); // Less than 1000
        }
    },
    waitForChanges: function (callback) {
        setTimeout(function () {
            if (callback) {
                callback();
            }
        }, 60);
    },
    distance: function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    },
    toDeg: function (angle) {
        return angle * (180 / Math.PI);
    },
    toRad: function (angle) {
        return angle * (Math.PI / 180);
    },
    lerp: function (start, end, amt) {
        var value = (1 - amt) * start + amt * end;

        if (!isNaN(value)) {
            if (Math.abs(value - start) > 50) {
                return end;
            } else {
                return value;
            }
        } else {
            return 0;
        }
    },
    inverseLerp: function (a, b, v) {
        if (a === b) return 0;

        return (v - a) / (b - a);
    },
    rotate: function (a0, a1, t) {
        return a0 + this.shortAngleDist(a0, a1) * t;
    },
    shortAngleDist: function (a0, a1) {
        var max = Math.PI * 2;
        var da = (a1 - a0) % max;
        return 2 * da % max - da;
    },
    signedAngle: function (from, to, upAxis) {
        const dot = pc.math.clamp(from.dot(to), -1, 1);
        const unsignedAngle = Math.acos(dot);

        const crossX = from.y * to.z - from.z * to.y;
        const crossY = from.z * to.x - from.x * to.z;
        const crossZ = from.x * to.y - from.y * to.x;

        const crossDotUp =
            crossX * upAxis.x +
            crossY * upAxis.y +
            crossZ * upAxis.z;

        const sign = Math.sign(crossDotUp);

        return unsignedAngle * sign;
    },
    float: function (number) {
        if (!isNaN(number)) {
            return number.toFixed(3);
        } else {
            return 0;
        }
    },
    mmss: function ($seconds) {
        var seconds = $seconds;
        var ms = Math.floor((seconds * 1000) % 1000);
        var s = Math.floor(seconds % 60);
        var m = Math.floor((seconds * 1000 / (1000 * 60)) % 60);
        var strFormat = "MM:SS";

        if (s < 10) s = "0" + s;
        if (m < 10) m = "0" + m;
        if (ms < 100) ms = "0" + ms;

        strFormat = strFormat.replace(/MM/, m);
        strFormat = strFormat.replace(/SS/, s);

        if ($seconds >= 0) {
            return strFormat;
        } else {
            return '00:00';
        }
    },
    mmssms: function ($seconds) {
        var seconds = $seconds;
        var ms = Math.floor((seconds * 1000) % 1000);
        var s = Math.floor(seconds % 60);
        var m = Math.floor((seconds / 60) % 60);
        var strFormat = "MM:SS:MS";

        if (s < 10) s = "0" + s;
        if (m < 10) m = "0" + m;
        if (ms < 100) {
            if (ms < 10) ms = "00" + ms;
            else ms = "0" + ms;
        }

        strFormat = strFormat.replace(/MM/, m);
        strFormat = strFormat.replace(/SS/, s);
        strFormat = strFormat.replace(/MS/, ms);

        if ($seconds >= 0) {
            return strFormat;
        } else {
            return '00:00:000';
        }
    },
    pad: function (data, length) {
        return ('000' + data).slice(-3);
    },
    isLocalStorageSupported: function () {
        var isSupported = false;
        var mod = 'localStorageSupportTest';

        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);

            isSupported = true;
        } catch (e) {
            isSupported = false;
        }

        return isSupported;
    },
    getColor: function (colorHex) {
        var color = new pc.Color();
        color.fromString(colorHex);

        return color;
    },
    setItem: function (key, value) {
        key = key + '_' + this.version;

        if (this.isLocalStorageSupported()) {
            window.localStorage.setItem(key, value);
        } else {
            this.createCookie(key, value);
        }
    },
    setItemAsArray: function (key, value) {
        key = key + '_' + this.version;

        if (this.isLocalStorageSupported()) {
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            this.createCookie(key, JSON.stringify(value));
        }
    },
    getItem: function (key) {
        key = key + '_' + this.version;

        if (this.isLocalStorageSupported()) {
            return window.localStorage.getItem(key);
        } else {
            return this.readCookie(key);
        }
    },
    increaseItemAsNumber: function (key, amount) {
        var item = this.getItemAsNumber(key);

        this.setItem(key, item + amount);
    },
    getItemAsNumber: function (key, defaultValue) {
        if (this.getItem(key)) {
            return parseInt(this.getItem(key));
        } else {
            if (defaultValue) {
                return defaultValue;
            } else {
                return 0;
            }
        }
    },
    getItemAsFloat: function (key, defaultValue) {
        if (this.getItem(key)) {
            return parseFloat(this.getItem(key));
        } else {
            if (defaultValue > -1) {
                return defaultValue;
            } else {
                return 0;
            }
        }
    },
    getItemAsArray: function (key) {
        if (this.getItem(key)) {
            return JSON.parse(this.getItem(key));
        } else {
            return [];
        }
    },
    getItemAsBoolean: function (key) {
        if (this.getItem(key)) {
            return true;
        } else {
            return false;
        }
    },
    deleteItem: function (key) {
        key = key + '_' + this.version;

        if (this.isLocalStorageSupported()) {
            window.localStorage.removeItem(key);
        } else {
            this.createCookie(key, '');
        }
    },
    setOnce: function (key) {
        if (Utils.getItem(key)) {
            return false;
        } else {
            Utils.setItem(key, 'Completed');
            return true;
        }
    },
    getItemAsString: function (_key, value) {
        var key = _key + '_' + this.version;

        var alreadyExist = Utils.getItem(_key);

        if (alreadyExist) {
            return alreadyExist;
        }

        if (this.isLocalStorageSupported()) {
            window.localStorage.setItem(key, value);
        } else {
            this.createCookie(key, value);
        }

        return value;
    },
    createCookie: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    shuffle: function (a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    },
    getRandom: function (array) {
        return array[Math.floor(array.length * Math.random())];
    },
    isMobileRegex: function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    isMobile: function () {
        return this.isMobileRegex() || this.isIOS();
    },
    isIOS: function () {
        if (/iPad|iPhone|iPod/.test(navigator.platform)) {
            return true;
        } else {
            return navigator.maxTouchPoints &&
                navigator.maxTouchPoints > 2 &&
                /MacIntel/.test(navigator.platform);
        }
    },
    number: function (value, _default) {
        if (value) {
            return parseInt(value);
        } else {
            return _default;
        }
    },
    getURLParams: function (name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    },
    getURLParam: function (param) {
        var pageURL = window.location.search.substring(1);
        var URLVariables = pageURL.split('&');
        for (var i = 0; i < URLVariables.length; i++) {
            var parameterName = URLVariables[i].split('=');
            if (parameterName[0] == param) {
                return parameterName[1];
            }
        }
    },
    getCussWords: function () {
        return ['2 girls 1 cup', '2g1c', '4r5e', '5h1t', '5hit', '5ht', '666', '@$$', 'a s s', 'a s shole', 'a55', 'a55hole', 'a_s_s', 'abbo', 'abeed', 'abuse', 'acrotomophilia', 'aeolus', 'africoon', 'ahole', 'alabama hot pocket', 'alaskan pipeline', 'alligator bait', 'alligatorbait', 'amcik', 'anal', 'analannie', 'analprobe', 'analsex', 'andskota', 'anilingus', 'anus', 'apeshit', 'ar5e', 'arabush', 'arabushs', 'areola', 'areole', 'argie', 'armo', 'armos', 'aroused', 'arrse', 'arschloch', 'arse', 'arsehole', 'aryan', 'ash0le', 'ash0les', 'asholes', 'ass monkey', 'ass', 'ass-fucker', 'ass-hat', 'ass-pirate', 'assbag', 'assbagger', 'assbandit', 'assbang', 'assbanged', 'assbanger', 'assbangs', 'assbite', 'assblaster', 'assclown', 'asscock', 'asscowboy', 'asscracker', 'asses', 'assface', 'assfuck', 'assfucker', 'assfukka', 'assgoblin', 'assh0le', 'assh0lez', 'asshat', 'asshead', 'assho1e', 'asshole', 'assholes', 'assholz', 'asshopper', 'asshore', 'assjacker', 'assjockey', 'asskiss', 'asskisser', 'assklown', 'asslick', 'asslicker', 'asslover', 'assman', 'assmaster', 'assmonkey', 'assmunch', 'assmuncher', 'assnigger', 'asspacker', 'asspirate', 'asspuppies', 'assrammer', 'assranger', 'assshit', 'assshole', 'asssucker', 'asswad', 'asswhole', 'asswhore', 'asswipe', 'asswipes', 'auto erotic', 'autoerotic', 'ayir', 'azazel', 'azz', 'azzhole', 'b a s t a r d', 'b i t c h', 'b o o b', 'b!+ch', 'b!tch', 'b!tchin', 'b*tch', 'b00b', 'b00bies', 'b00biez', 'b00bs', 'b00bz', 'b17ch', 'b1tch', 'b7ch', 'babeland', 'babes', 'baby batter', 'baby juice', 'backdoor', 'backdoorman', 'badfuck', 'bagging', 'ball gag', 'ball gravy', 'ball kicking', 'ball licking', 'ball sack', 'ball sucking', 'ballbag', 'balllicker', 'ballsack', 'bampot', 'bangbro', 'bangbros', 'bangbus', 'banger', 'banging', 'bareback', 'barely legal', 'barelylegal', 'barenaked', 'barf', 'barface', 'barfface', 'bassterd', 'bassterds', 'bastard', 'bastardo', 'bastards', 'bastardz', 'basterds', 'basterdz', 'bastinado', 'bawdy', 'bazongas', 'bazooms', 'bbw', 'bdsm', 'beaner', 'beaners', 'beaney', 'beaneys', 'beardedclam', 'beastality', 'beastial', 'beastiality', 'beastility', 'beatch', 'beatoff', 'beatyourmeat', 'beaver cleaver', 'beaver lips', 'beef curtains', 'beeyotch', 'bellend', 'beotch', 'bestial', 'bestiality', 'bi curious', 'bi+ch', 'bi7ch', 'biatch', 'bicurious', 'big black', 'big breasts', 'big knockers', 'big tits', 'bigass', 'bigbastard', 'bigbreasts', 'bigbutt', 'bigtits', 'bimbo', 'bimbos', 'bint', 'birdlock', 'bitch', 'bitchass', 'bitched', 'bitcher', 'bitchers', 'bitches', 'bitchez', 'bitchin', 'bitching', 'bitchslap', 'bitchtit', 'bitchy', 'biteme', 'bitties', 'black cock', 'blackcock', 'blackman', 'blackout', 'blacks', 'blonde action', 'blonde on blonde action', 'blonde on blonde', 'bloodclaat', 'bloody', 'blow j', 'blow job', 'blow your l', 'blow your load', 'blowjob', 'blowjobs', 'blue waffle', 'bluegum', 'bluegums', 'blumpkin', 'bo ob', 'bo obs', 'boang', 'boche', 'boches', 'bodily', 'boffing', 'bogan', 'bohunk', 'boink', 'boiolas', 'bollick', 'bollock', 'bollocks', 'bollok', 'bollox', 'bombers', 'bombing', 'bomd', 'bondage', 'boned', 'boner', 'boners', 'bong', 'bookie', 'boong', 'boonga', 'boongas', 'boongs', 'boonie', 'boonies', 'booobs', 'boooobs', 'booooobs', 'booooooobs', 'bootee', 'bootlip', 'bootlips', 'boozer', 'boozy', 'bosch', 'bosche', 'bosches', 'boschs', 'bosomy', 'bounty bar', 'bounty bars', 'bountybar', 'brea5t', 'breastjob', 'breastlover', 'breastman', 'brown shower', 'brown showers', 'brunette action', 'btch', 'buceta', 'buddhahead', 'buddhaheads', 'buffies', 'bugger', 'buggered', 'buggery', 'bukake', 'bukkake', 'bullcrap', 'bulldike', 'bulldyke', 'bullet vibe', 'bullshit', 'bullshits', 'bullshitted', 'bullturds', 'bumblefuck', 'bumfuck', 'bung hole', 'bung', 'bunga', 'bungas', 'bunghole', 'bunny fucker', 'burr head', 'burr heads', 'burrhead', 'burrheads', 'butchbabes', 'butchdike', 'butchdyke', 'butt plug', 'butt-pirate', 'buttbang', 'buttcheeks', 'buttface', 'buttfuck', 'buttfucker', 'buttfuckers', 'butthead', 'butthole', 'buttman', 'buttmuch', 'buttmunch', 'buttmuncher', 'buttpirate', 'buttplug', 'buttstain', 'buttwipe', 'byatch', 'c u n t', 'c-0-c-k', 'c-o-c-k', 'c-u-n-t', 'c.0.c.k', 'c.o.c.k.', 'c.u.n.t', 'c0ck', 'c0cks', 'c0cksucker', 'c0k', 'cabron', 'caca', 'cacker', 'cahone', 'camel jockey', 'camel jockeys', 'camel toe', 'cameljockey', 'cameltoe', 'camgirl', 'camslut', 'camwhore', 'carpet muncher', 'carpetmuncher', 'carruth', 'cawk', 'cawks', 'cazzo', 'cervix', 'chav', 'cheese eating surrender monkey', 'cheese eating surrender monkies', 'cheeseeating surrender monkey', 'cheeseeating surrender monkies', 'cheesehead', 'cheeseheads', 'cherrypopper', 'chickslick', 'china swede', 'china swedes', 'chinaman', 'chinamen', 'chinaswede', 'chinaswedes', 'chinc', 'chincs', 'ching chong', 'ching chongs', 'chinga', 'chingchong', 'chingchongs', 'chink', 'chinks', 'chinky', 'choad', 'chocolate rosebuds', 'chode', 'chodes', 'chonkies', 'chonky', 'chonkys', 'chraa', 'christ killer', 'christ killers', 'chug', 'chugs', 'chuj', 'chunger', 'chungers', 'chunkies', 'chunkys', 'chute', 'cipa', 'circlejerk', 'cl1t', 'clamdigger', 'clamdiver', 'clamps', 'clansman', 'clansmen', 'clanswoman', 'clanswomen', 'cleveland steamer', 'clit', 'clitface', 'clitfuck', 'clitoris', 'clitorus', 'clits', 'clitty', 'clogwog', 'clover clamps', 'clusterfuck', 'cnts', 'cntz', 'cnut', 'cocain', 'cocaine', 'cock', 'cock-head', 'cock-sucker', 'cockbite', 'cockblock', 'cockblocker', 'cockburger', 'cockcowboy', 'cockface', 'cockfight', 'cockfucker', 'cockhead', 'cockholster', 'cockjockey', 'cockknob', 'cockknocker', 'cockknoker', 'cocklicker', 'cocklover', 'cockmaster', 'cockmongler', 'cockmongruel', 'cockmonkey', 'cockmunch', 'cockmuncher', 'cocknob', 'cocknose', 'cocknugget', 'cockqueen', 'cockrider', 'cocks', 'cockshit', 'cocksman', 'cocksmith', 'cocksmoker', 'cocksucer', 'cocksuck', 'cocksucked', 'cocksucker', 'cocksucking', 'cocksucks', 'cocksuka', 'cocksukka', 'cocktease', 'cocky', 'cohee', 'coital', 'coitus', 'cok', 'cokmuncher', 'coksucka', 'commie', 'condom', 'coochie', 'coochy', 'coolie', 'coolies', 'cooly', 'coon ass', 'coon asses', 'coonass', 'coonasses', 'coondog', 'coons', 'cooter', 'coprolagnia', 'coprophilia', 'copulate', 'corksucker', 'cornhole', 'cra5h', 'crabs', 'crackcocain', 'cracker', 'crackpipe', 'crackwhore', 'crap', 'crapola', 'crapper', 'crappy', 'creampie', 'crotch', 'crotchjockey', 'crotchmonkey', 'crotchrot', 'cuck', 'cum face', 'cum licker', 'cum', 'cumbubble', 'cumdumpster', 'cumfest', 'cumguzzler', 'cuming', 'cumjockey', 'cumlickr', 'cumm', 'cummer', 'cummin', 'cumming', 'cumquat', 'cumqueen', 'cums', 'cumshot', 'cumshots', 'cumslut', 'cumstain', 'cumsucker', 'cumtart', 'cunilingus', 'cunillingus', 'cunn', 'cunnie', 'cunnilingus', 'cunntt', 'cunny', 'cunt', 'cunteyed', 'cuntface', 'cuntfuck', 'cuntfucker', 'cunthole', 'cunthunter', 'cuntlick', 'cuntlicker', 'cuntlicking', 'cuntrag', 'cunts', 'cuntslut', 'cuntsucker', 'cuntz', 'curry muncher', 'curry munchers', 'currymuncher', 'currymunchers', 'cushi', 'cushis', 'cyalis', 'cyberfuc', 'cyberfuck', 'cyberfucked', 'cyberfucker', 'cyberfuckers', 'cyberfucking', 'cybersex', 'cyberslimer', 'd0ng', 'd0uch3', 'd0uche', 'd1ck', 'd1ld0', 'd1ldo', 'd4mn', 'dago', 'dagos', 'dahmer', 'damm', 'dammit', 'damn', 'damnation', 'damned', 'damnit', 'darkey', 'darkeys', 'darkie', 'darkies', 'darky', 'date rape', 'daterape', 'datnigga', 'dawgie style', 'dawgie-style', 'daygo', 'deapthroat', 'deep throat', 'deep throating', 'deepaction', 'deepthroat', 'deepthroating', 'defecate', 'deggo', 'dego', 'degos', 'demon', 'dendrophilia', 'destroyyourpussy', 'deth', 'diaper daddy', 'diaper head', 'diaper heads', 'diaperdaddy', 'diaperhead', 'diaperheads', 'dick pic', 'dick', 'dick-ish', 'dickbag', 'dickbeater', 'dickbeaters', 'dickbrain', 'dickdipper', 'dickface', 'dickflipper', 'dickforbrains', 'dickfuck', 'dickhead', 'dickheads', 'dickhole', 'dickish', 'dickjuice', 'dickless', 'dicklick', 'dicklicker', 'dickman', 'dickmilk', 'dickmonger', 'dickpic', 'dickripper', 'dicks', 'dicksipper', 'dickslap', 'dickslicker', 'dicksucker', 'dickwad', 'dickweasel', 'dickweed', 'dickwhipper', 'dickwod', 'dickzipper', 'diddle', 'dike', 'dild0', 'dild0s', 'dildo', 'dildos', 'dilf', 'diligaf', 'dilld0', 'dilld0s', 'dillweed', 'dimwit', 'dingle', 'dingleberries', 'dingleberry', 'dink', 'dinks', 'dipship', 'dipshit', 'dipstick', 'dirsa', 'dirty pillows', 'dirty sanchez', 'dix', 'dixiedike', 'dixiedyke', 'dlck', 'dog style', 'dog-fucker', 'doggie style', 'doggie', 'doggie-style', 'doggiestyle', 'doggin', 'dogging', 'doggy style', 'doggy-style', 'doggystyle', 'dolcett', 'domination', 'dominatricks', 'dominatrics', 'dominatrix', 'dommes', 'dong', 'donkey punch', 'donkeypunch', 'donkeyribber', 'doochbag', 'doodoo', 'doofus', 'dookie', 'doosh', 'dot head', 'dot heads', 'dothead', 'dotheads', 'double dong', 'double penetration', 'doubledong', 'doublepenetration', 'douch3', 'douche bag', 'douche', 'douche-fag', 'douchebag', 'douchebags', 'douchewaffle', 'douchey', 'dp action', 'dpaction', 'dragqueen', 'dragqween', 'dripdick', 'dry hump', 'dryhump', 'duche', 'dudette', 'dumass', 'dumb ass', 'dumbass', 'dumbasses', 'dumbbitch', 'dumbfuck', 'dumbshit', 'dumshit', 'dune coon', 'dune coons', 'dupa', 'dvda', 'dyefly', 'dyke', 'dykes', 'dziwka', 'earotics', 'easyslut', 'eat my ass', 'eat my', 'eatadick', 'eatballs', 'eathairpie', 'eatme', 'eatmyass', 'eatpussy', 'ecchi', 'ejackulate', 'ejakulate', 'ekrem', 'ekto', 'enculer', 'enema', 'enlargement', 'erect', 'erection', 'ero', 'erotic', 'erotism', 'escort', 'esqua', 'essohbee', 'ethical slut', 'evl', 'excrement', 'exkwew', 'extacy', 'extasy', 'f u c k e r', 'f u c k e', 'f u c k', 'f u k', 'f*ck', 'f-u-c-k', 'f.u.c.k', 'f4nny', 'f_u_c_k', 'facefucker', 'fack', 'faeces', 'faen', 'fag', 'fag1t', 'fagbag', 'faget', 'fagfucker', 'fagg', 'fagg1t', 'fagged', 'fagging', 'faggit', 'faggitt', 'faggot', 'faggotcock', 'faggs', 'fagit', 'fagot', 'fagots', 'fags', 'fagt', 'fagtard', 'fagz', 'faig', 'faigs', 'faigt', 'fanculo', 'fannybandit', 'fannyflaps', 'fannyfucker', 'fanyy', 'fartknocker', 'fastfuck', 'fatah', 'fatfuck', 'fatfucker', 'fatso', 'fck', 'fckcum', 'fckd', 'fcuk', 'fcuker', 'fcuking', 'fecal', 'feck', 'fecker', 'feg', 'felatio', 'felch', 'felcher', 'felching', 'fellate', 'fellatio', 'feltch', 'feltcher', 'feltching', 'female squirting', 'femalesquirtin', 'femalesquirting', 'femdom', 'fetish', 'ficken', 'figging', 'fingerbang', 'fingerfood', 'fingerfuck', 'fingerfucked', 'fingerfucker', 'fingerfuckers', 'fingerfucking', 'fingerfucks', 'fingering', 'fisted', 'fister', 'fistfuck', 'fistfucked', 'fistfucker', 'fistfuckers', 'fistfucking', 'fistfuckings', 'fistfucks', 'fisting', 'fisty', 'fitt', 'flamer', 'flange', 'flasher', 'flikker', 'flipping the bird', 'flogthelog', 'floo', 'floozy', 'flydie', 'flydye', 'foad', 'fok', 'fondle', 'foobar', 'fook', 'fooker', 'foot fetish', 'footaction', 'footfetish', 'footfuck', 'footfucker', 'footjob', 'footlicker', 'footstar', 'foreskin', 'forni', 'fornicate', 'fotze', 'foursome', 'fourtwenty', 'freakfuck', 'freakyfucker', 'freefuck', 'freex', 'frigg', 'frigga', 'frigger', 'frotting', 'fucck', 'fuck', 'fuck-tard', 'fucka', 'fuckable', 'fuckass', 'fuckbag', 'fuckbitch', 'fuckbook', 'fuckboy', 'fuckbrain', 'fuckbuddy', 'fuckbutt', 'fuckd', 'fucked', 'fuckedup', 'fucker', 'fuckers', 'fuckersucker', 'fuckface', 'fuckfest', 'fuckfreak', 'fuckfriend', 'fuckhead', 'fuckheads', 'fuckher', 'fuckhole', 'fuckin', 'fuckina', 'fucking', 'fuckingbitch', 'fuckings', 'fuckingshitmotherfucker', 'fuckinnuts', 'fuckinright', 'fuckit', 'fuckknob', 'fuckme', 'fuckmeat', 'fuckmehard', 'fuckmonkey', 'fuckn', 'fucknugget', 'fucknut', 'fucknuts', 'fucknutt', 'fucknutz', 'fuckoff', 'fuckpig', 'fuckpuppet', 'fuckr', 'fucks', 'fuckstick', 'fucktard', 'fucktards', 'fucktoy', 'fucktrophy', 'fuckup', 'fuckwad', 'fuckwhit', 'fuckwhore', 'fuckwit', 'fuckwitt', 'fuckyomama', 'fuckyou', 'fudge packer', 'fudgepacker', 'fugly', 'fuk', 'fukah', 'fuken', 'fuker', 'fukin', 'fuking', 'fukk', 'fukkah', 'fukken', 'fukker', 'fukkin', 'fukking', 'fuks', 'fuktard', 'fuktards', 'fukwhit', 'fukwit', 'funfuck', 'fungus', 'futanari', 'futanary', 'futkretzn', 'fuuck', 'fux', 'fux0r', 'fuxor', 'fvck', 'fvk', 'fxck', 'g-spot', 'g00k', 'gae', 'gai', 'gang bang', 'gangbang', 'gangbanged', 'gangbanger', 'gangbangs', 'gangsta', 'ganja', 'gassyass', 'gator bait', 'gatorbait', 'gay sex', 'gayass', 'gaybob', 'gayboy', 'gaydo', 'gaygirl', 'gaylord', 'gaymuthafuckinwhore', 'gays', 'gaysex', 'gaytard', 'gaywad', 'gayz', 'geezer', 'geni', 'genital', 'genitals', 'getiton', 'gey', 'gfy', 'ghay', 'ghey', 'giant cock', 'gigolo', 'ginzo', 'ginzos', 'gipp', 'gippo', 'gippos', 'gipps', 'girl on top', 'girl on', 'girls gone wild', 'givehead', 'glans', 'glazeddonut', 'goatcx', 'goatse', 'gob', 'god dammit', 'god damn', 'god damnit', 'god-dam', 'god-damned', 'godam', 'godammit', 'godamn', 'godamnit', 'goddam', 'goddamit', 'goddamm', 'goddammit', 'goddamn', 'goddamned', 'goddamnes', 'goddamnit', 'goddamnmuthafucker', 'godsdamn', 'gokkun', 'golden shower', 'goldenshower', 'golliwog', 'golliwogs', 'gonad', 'gonads', 'gonorrehea', 'gonzagas', 'goo girl', 'gooch', 'goodpoop', 'gook eye', 'gook eyes', 'gook', 'gookeye', 'gookeyes', 'gookies', 'gooks', 'gooky', 'gora', 'goras', 'goregasm', 'gotohell', 'goy', 'goyim', 'greaseball', 'greaseballs', 'groe', 'groid', 'groids', 'grope', 'grostulation', 'group sex', 'gspot', 'gstring', 'gtfo', 'gub', 'gubba', 'gubbas', 'gubs', 'guido', 'guiena', 'guineas', 'guizi', 'gummer', 'guro', 'gwailo', 'gwailos', 'gweilo', 'gweilos', 'gyopo', 'gyopos', 'gyp', 'gyped', 'gypo', 'gypos', 'gypp', 'gypped', 'gyppie', 'gyppies', 'gyppo', 'gyppos', 'gyppy', 'gyppys', 'gypsys', 'h e l l', 'h o m', 'h00r', 'h0ar', 'h0m0', 'h0mo', 'h0r', 'h0re', 'h4x0r', 'hadji', 'hadjis', 'hairyback', 'hairybacks', 'haji', 'hajis', 'hajji', 'hajjis', 'half breed', 'half caste', 'halfbreed', 'halfcaste', 'hamas', 'hamflap', 'hand job', 'handjob', 'haole', 'haoles', 'hapa', 'hard core', 'hardcore', 'hardcoresex', 'hardon', 'harem', 'he11', 'headfuck', 'hebe', 'hebes', 'heeb', 'heebs', 'hell', 'hells', 'helvete', 'hentai', 'heroin', 'herp', 'herpes', 'herpy', 'heshe', 'hijacker', 'hijacking', 'hillbillies', 'hillbilly', 'hindoo', 'hiscock', 'hitler', 'hitlerism', 'hitlerist', 'hoar', 'hoare', 'hobag', 'hodgie', 'hoe', 'hoer', 'hoes', 'holestuffer', 'hom0', 'homey', 'homo', 'homobangers', 'homodumbshit', 'homoey', 'honger', 'honkers', 'honkey', 'honkeys', 'honkie', 'honkies', 'honky', 'hooch', 'hooker', 'hookers', 'hoor', 'hoore', 'hootch', 'hooter', 'hooters', 'hore', 'hori', 'horis', 'hork', 'horndawg', 'horndog', 'horney', 'horniest', 'horny', 'horseshit', 'hosejob', 'hoser', 'hot carl', 'hot chick', 'hotcarl', 'hotdamn', 'hotpussy', 'hotsex', 'hottotrot', 'how to kill', 'how to murder', 'howtokill', 'howtomurdep', 'huevon', 'huge fat', 'hugefat', 'hui', 'hummer', 'humped', 'humper', 'humpher', 'humphim', 'humpin', 'humping', 'hussy', 'hustler', 'hymen', 'hymie', 'hymies', 'iblowu', 'ike', 'ikes', 'ikey', 'ikeymo', 'ikeymos', 'ikwe', 'illegal', 'illegals', 'inbred', 'incest', 'indon', 'indons', 'injun', 'injuns', 'insest', 'intercourse', 'interracial', 'intheass', 'inthebuff', 'israels', 'j3rk0ff', 'jack off', 'jack-off', 'jackass', 'jackhole', 'jackoff', 'jackshit', 'jacktheripper', 'jail bait', 'jailbait', 'jap', 'japcrap', 'japie', 'japies', 'japs', 'jebus', 'jelly donut', 'jerk off', 'jerk', 'jerk-off', 'jerk0ff', 'jerked', 'jerkoff', 'jerries', 'jerry', 'jewboy', 'jewed', 'jewess', 'jiga', 'jigaboo', 'jigaboos', 'jigarooni', 'jigaroonis', 'jigg', 'jigga', 'jiggabo', 'jiggaboo', 'jiggabos', 'jiggas', 'jigger', 'jiggerboo', 'jiggers', 'jiggs', 'jiggy', 'jigs', 'jihad', 'jijjiboo', 'jijjiboos', 'jimfish', 'jisim', 'jism', 'jiss', 'jiz', 'jizim', 'jizin', 'jizjuice', 'jizm', 'jizn', 'jizz', 'jizzd', 'jizzed', 'jizzim', 'jizzin', 'jizzn', 'jizzum', 'jugg', 'juggs', 'jugs', 'jungle bunnies', 'jungle bunny', 'junglebunny', 'junkie', 'junky', 'kacap', 'kacapas', 'kacaps', 'kaffer', 'kaffir', 'kaffre', 'kafir', 'kanake', 'kanker', 'katsap', 'katsaps', 'kawk', 'khokhol', 'khokhols', 'kicking', 'kigger', 'kike', 'kikes', 'kimchis', 'kinbaku', 'kink', 'kinkster', 'kinky', 'kinkyJesus', 'kissass', 'kiunt', 'kkk', 'klan', 'klansman', 'klansmen', 'klanswoman', 'klanswomen', 'klootzak', 'knobbing', 'knobead', 'knobed', 'knobend', 'knobhead', 'knobjocky', 'knobjokey', 'knobz', 'knockers', 'knulle', 'kock', 'kondum', 'kondums', 'kooch', 'kooches', 'koon', 'kootch', 'krap', 'krappy', 'kraut', 'krauts', 'kuffar', 'kuk', 'kuksuger', 'kum', 'kumbubble', 'kumbullbe', 'kumer', 'kummer', 'kumming', 'kumquat', 'kums', 'kunilingus', 'kunnilingus', 'kunt', 'kunts', 'kuntz', 'kurac', 'kurwa', 'kushi', 'kushis', 'kusi', 'kwa', 'kwai lo', 'kwai los', 'kwif', 'kyke', 'kykes', 'kyopo', 'kyopos', 'kyrpa', 'l3i+ch', 'l3i\\+ch', 'l3itch', 'labia', 'lapdance', 'leather restraint', 'leather straight', 'leatherrestraint', 'lebos', 'lech', 'lemon party', 'lemonparty', 'leper', 'lesbain', 'lesbayn', 'lesbin', 'lesbo', 'lesbos', 'lez', 'lezbe', 'lezbefriends', 'lezbian', 'lezbians', 'lezbo', 'lezbos', 'lezz', 'lezzian', 'lezzie', 'lezzies', 'lezzo', 'lezzy', 'libido', 'licker', 'licking', 'lickme', 'lilniglet', 'limey', 'limpdick', 'limy', 'lingerie', 'lipshits', 'lipshitz', 'livesex', 'loadedgun', 'loin', 'loins', 'lolita', 'lovebone', 'lovegoo', 'lovegun', 'lovejuice', 'lovemaking', 'lovemuscle', 'lovepistol', 'loverocket', 'lowlife', 'lsd', 'lubejob', 'lubra', 'lucifer', 'luckycammeltoe', 'lugan', 'lugans', 'lust', 'lusting', 'lusty', 'lynch', 'm-fucking', 'm0f0', 'm0fo', 'm45terbate', 'ma5terb8', 'ma5terbate', 'mabuno', 'mabunos', 'macaca', 'macacas', 'mafugly', 'magicwand', 'mahbuno', 'mahbunos', 'make me come', 'makemecome', 'makemecum', 'male squirting', 'mamhoon', 'mams', 'manhater', 'manpaste', 'maricon', 'maricón', 'marijuana', 'masochist', 'masokist', 'massa', 'massterbait', 'masstrbait', 'masstrbate', 'mastabate', 'mastabater', 'master-bate', 'masterb8', 'masterbaiter', 'masterbat', 'masterbat3', 'masterbate', 'masterbates', 'masterbating', 'masterbation', 'masterbations', 'masterblaster', 'mastrabator', 'masturbat', 'masturbate', 'masturbating', 'masturbation', 'mattressprincess', 'mau mau', 'mau maus', 'maumau', 'maumaus', 'mcfagget', 'meatbeatter', 'meatrack', 'menage', 'merd', 'mgger', 'mggor', 'mibun', 'mick', 'mickeyfinn', 'mideast', 'mierda', 'milf', 'minge', 'minger', 'mo-fo', 'mockey', 'mockie', 'mocky', 'mof0', 'mofo', 'moky', 'molest', 'molestation', 'molester', 'molestor', 'moneyshot', 'mong', 'monkleigh', 'moolie', 'moon cricket', 'moon crickets', 'mooncricket', 'mooncrickets', 'mormon', 'moron', 'moskal', 'moskals', 'moslem', 'mosshead', 'motha fucker', 'motha fuker', 'motha fukkah', 'motha fukker', 'mothafuck', 'mothafucka', 'mothafuckas', 'mothafuckaz', 'mothafucked', 'mothafucker', 'mothafuckers', 'mothafuckin', 'mothafucking', 'mothafuckings', 'mothafucks', 'mother fucker', 'mother fukah', 'mother fuker', 'mother fukkah', 'mother fukker', 'mother-fucker', 'motherfuck', 'motherfucka', 'motherfucked', 'motherfucker', 'motherfuckers', 'motherfuckin', 'motherfucking', 'motherfuckings', 'motherfuckka', 'motherfucks', 'motherfvcker', 'motherlovebone', 'mothrfucker', 'mouliewop', 'mound of venus', 'moundofvenus', 'mr hands', 'mrhands', 'mtherfucker', 'mthrfuck', 'mthrfucker', 'mthrfucking', 'mtrfck', 'mtrfuck', 'mtrfucker', 'muff diver', 'muff', 'muffdive', 'muffdiver', 'muffdiving', 'muffindiver', 'mufflikcer', 'muffpuff', 'muie', 'mulatto', 'mulkku', 'muncher', 'mung', 'munging', 'munt', 'munter', 'muschi', 'mutha fucker', 'mutha fukah', 'mutha fuker', 'mutha fukkah', 'mutha fukker', 'muthafecker', 'muthafuckaz', 'muthafucker', 'muthafuckker', 'muther', 'mutherfucker', 'mutherfucking', 'muthrfucking', 'mzungu', 'mzungus', 'n1gga', 'n1gger', 'n1gr', 'nad', 'nads', 'naked', 'nambla', 'nappy', 'nastt', 'nasty', 'nastybitch', 'nastyho', 'nastyslut', 'nastywhore', 'nawashi', 'nazi', 'nazis', 'nazism', 'necked', 'necro', 'needthedick', 'negres', 'negress', 'negro', 'negroes', 'negroid', 'negros', 'neonazi', 'nepesaurio', 'nig nog', 'nig', 'niga', 'nigar', 'nigars', 'nigas', 'nigers', 'nigette', 'nigettes', 'nigg', 'nigg3r', 'nigg4h', 'nigga', 'niggah', 'niggahs', 'niggar', 'niggaracci', 'niggard', 'niggarded', 'niggarding', 'niggardliness', 'niggardlinesss', 'niggardly', 'niggards', 'niggars', 'niggas', 'niggaz', 'nigger', 'niggerhead', 'niggerhole', 'niggers', 'niggle', 'niggled', 'niggles', 'niggling', 'nigglings', 'niggor', 'niggress', 'niggresses', 'nigguh', 'nigguhs', 'niggur', 'niggurs', 'niglet', 'nignog', 'nigor', 'nigors', 'nigr', 'nigra', 'nigras', 'nigre', 'nigres', 'nigress', 'nigs', 'nigur', 'niiger', 'niigr', 'nimphomania', 'nimrod', 'ninny', 'nip', 'nipple', 'nipplering', 'nipples', 'nips', 'nittit', 'nlgger', 'nlggor', 'nob jokey', 'nob', 'nobhead', 'nobjocky', 'nobjokey', 'nofuckingway', 'nog', 'nookey', 'nookie', 'nooky', 'noonan', 'nooner', 'nsfw images', 'nsfw', 'nudger', 'nudie', 'nudies', 'numbnuts', 'nut sack', 'nutbutter', 'nutfucker', 'nutsack', 'nutten', 'nymph', 'nympho', 'nymphomania', 'o c k', 'octopussy', 'omorashi', 'one cup two girls', 'one guy one jar', 'one guy', 'one jar', 'ontherag', 'orafis', 'orally', 'orga', 'orgasim', 'orgasim;', 'orgasims', 'orgasm', 'orgasmic', 'orgasms', 'orgasum', 'orgies', 'orgy', 'oriface', 'orifice', 'orifiss', 'orospu', 'osama', 'ovum', 'ovums', 'p e n i s', 'p i s', 'p u s s y', 'p.u.s.s.y.', 'p0rn', 'packi', 'packie', 'packy', 'paddy', 'paedophile', 'paki', 'pakie', 'pakis', 'paky', 'palesimian', 'pancake face', 'pancake faces', 'panooch', 'pansies', 'pansy', 'panti', 'pantie', 'panties', 'panty', 'paska', 'pastie', 'pasty', 'payo', 'pcp', 'pearlnecklace', 'pecker', 'peckerhead', 'peckerwood', 'pedo', 'pedobear', 'pedophile', 'pedophilia', 'pedophiliac', 'peeenus', 'peeenusss', 'peehole', 'peenus', 'peepee', 'peepshow', 'peepshpw', 'pegging', 'peinus', 'pen1s', 'penas', 'pendejo', 'pendy', 'penetrate', 'penetration', 'peni5', 'penial', 'penile', 'penis', 'penis-breath', 'penises', 'penisfucker', 'penisland', 'penislick', 'penislicker', 'penispuffer', 'penthouse', 'penus', 'penuus', 'perse', 'perv', 'perversion', 'peyote', 'phalli', 'phallic', 'phone sex', 'phonesex', 'phuc', 'phuck', 'phuk', 'phuked', 'phuker', 'phuking', 'phukked', 'phukker', 'phukking', 'phuks', 'phungky', 'phuq', 'pi55', 'picaninny', 'piccaninny', 'picka', 'pickaninnies', 'pickaninny', 'piece of shit', 'pieceofshit', 'piefke', 'piefkes', 'pierdol', 'pigfucker', 'piker', 'pikey', 'piky', 'pillowbiter', 'pillu', 'pimmel', 'pimp', 'pimped', 'pimper', 'pimpis', 'pimpjuic', 'pimpjuice', 'pimpsimp', 'pindick', 'pinko', 'pis', 'pises', 'pisin', 'pising', 'pisof', 'piss pig', 'piss', 'piss-off', 'pissed', 'pisser', 'pissers', 'pisses', 'pissflap', 'pissflaps', 'pisshead', 'pissin', 'pissing', 'pissoff', 'pisspig', 'pistol', 'pizda', 'playboy', 'playgirl', 'pleasure chest', 'pleasurechest', 'pocha', 'pochas', 'pocho', 'pochos', 'pocketpool', 'pohm', 'pohms', 'polac', 'polack', 'polacks', 'polak', 'pole smoker', 'polesmoker', 'pollock', 'pollocks', 'pommie grant', 'pommie grants', 'pommy', 'ponyplay', 'poof', 'poon', 'poonani', 'poonany', 'poontang', 'poontsee', 'poop chute', 'poopchute', 'pooper', 'pooperscooper', 'pooping', 'poorwhitetrash', 'popimp', 'porch monkey', 'porch monkies', 'porchmonkey', 'porn', 'pornflick', 'pornking', 'porno', 'pornography', 'pornos', 'pornprincess', 'pound town', 'poundtown', 'pplicker', 'pr0n', 'pr1c', 'pr1ck', 'pr1k', 'prairie nigger', 'prairie niggers', 'premature', 'preteen', 'pric', 'prickhead', 'pricks', 'prig', 'prince albert piercing', 'pron', 'prostitute', 'pthc', 'pu55i', 'pu55y', 'pube', 'pubes', 'pubic', 'pubiclice', 'pubis', 'pud', 'pudboy', 'pudd', 'puddboy', 'puke', 'pula', 'pule', 'punani', 'punanny', 'punany', 'punkass', 'punky', 'punta', 'puntang', 'purinapricness', 'pusies', 'puss', 'pusse', 'pussee', 'pussi', 'pussie', 'pussies', 'pussy', 'pussycat', 'pussydestroyer', 'pussyeater', 'pussyfart', 'pussyfucker', 'pussylicker', 'pussylicking', 'pussylips', 'pussylover', 'pussypalace', 'pussypounder', 'pussys', 'pusy', 'puta', 'puto', 'puuke', 'puuker', 'qahbeh', 'quashie', 'queaf', 'queef', 'queerhole', 'queero', 'queers', 'queerz', 'quickie', 'quicky', 'quiff', 'quim', 'qweers', 'qweerz', 'qweir', 'r-tard', 'r-tards', 'r5e', 'ra8s', 'raghead', 'ragheads', 'rape', 'raped', 'raper', 'raping', 'rapist', 'rautenberg', 'rearend', 'rearentry', 'recktum', 'rectal', 'rectum', 'rectus', 'redleg', 'redlegs', 'redlight', 'redneck', 'rednecks', 'redskin', 'redskins', 'reefer', 'reestie', 'reetard', 'reich', 'renob', 'rentafuck', 'rere', 'retard', 'retarded', 'retards', 'retardz', 'reverse cowgirl', 'reversecowgirl', 'rigger', 'rimjaw', 'rimjob', 'rimming', 'ritard', 'rosebuds', 'rosy palm and her 5 sisters', 'rosy palm', 'rosypalm', 'rosypalmandher5sisters', 'rosypalmandherefivesisters', 'round eyes', 'roundeye', 'rtard', 'rtards', 'rumprammer', 'ruski', 'russki', 'russkie', 'rusty trombone', 'rustytrombone', 's h i t', 's hit', 's&m', 's-h-1-t', 's-h-i-t', 's-o-b', 's.h.i.t.', 's.o.b.', 's0b', 's_h_i_t', 'sac', 'sadis', 'sadism', 'sadist', 'sadom', 'sambo', 'sambos', 'samckdaddy', 'sanchez', 'sand nigger', 'sand niggers', 'sandm', 'sandnigger', 'santorum', 'sausagequeen', 'scag', 'scallywag', 'scank', 'scantily', 'scat', 'schaffer', 'scheiss', 'schizo', 'schlampe', 'schlong', 'schmuck', 'schvartse', 'schvartsen', 'schwartze', 'schwartzen', 'scissoring', 'screwed', 'screwing', 'screwyou', 'scroat', 'scrog', 'scrote', 'scrotum', 'scrud', 'seduce', 'semen', 'seppo', 'seppos', 'septics', 'sex', 'sexcam', 'sexed', 'sexfarm', 'sexhound', 'sexhouse', 'sexi', 'sexing', 'sexkitten', 'sexo', 'sexpot', 'sexslave', 'sextogo', 'sextoy', 'sextoys', 'sexual', 'sexually', 'sexwhore', 'sexx', 'sexxi', 'sexxx', 'sexxxi', 'sexxxy', 'sexxy', 'sexy', 'sexymoma', 'sexyslim', 'sh!+', 'sh!t', 'sh1t', 'sh1ter', 'sh1ts', 'sh1tter', 'sh1tz', 'shag', 'shagger', 'shaggin', 'shagging', 'shamedame', 'sharmuta', 'sharmute', 'shat', 'shav', 'shaved beaver', 'shaved pussy', 'shavedbeaver', 'shavedpussy', 'shawtypimp', 'sheeney', 'shemale', 'shhit', 'shi+', 'shibari', 'shibary', 'shinola', 'shipal', 'shit ass', 'shit', 'shit-ass', 'shit-bag', 'shit-bagger', 'shit-brain', 'shit-breath', 'shit-cunt', 'shit-dick', 'shit-eating', 'shit-face', 'shit-faced', 'shit-fit', 'shit-head', 'shit-heel', 'shit-hole', 'shit-house', 'shit-load', 'shit-pot', 'shit-spitter', 'shit-stain', 'shitass', 'shitbag', 'shitbagger', 'shitblimp', 'shitbrain', 'shitbreath', 'shitcan', 'shitcunt', 'shitdick', 'shite', 'shiteater', 'shiteating', 'shited', 'shitey', 'shitface', 'shitfaced', 'shitfit', 'shitforbrains', 'shitfuck', 'shitfucker', 'shitfull', 'shithapens', 'shithappens', 'shithead', 'shitheel', 'shithole', 'shithouse', 'shiting', 'shitings', 'shitlist', 'shitload', 'shitola', 'shitoutofluck', 'shitpot', 'shits', 'shitspitter', 'shitstain', 'shitt', 'shitted', 'shitter', 'shitters', 'shittiest', 'shitting', 'shittings', 'shitty', 'shity', 'shitz', 'shiz', 'shiznit', 'shortfuck', 'shota', 'shrimping', 'shylock', 'shylocks', 'shyt', 'shyte', 'shytty', 'shyty', 'simp', 'sissy', 'sixsixsix', 'sixtynine', 'sixtyniner', 'skag', 'skanck', 'skank', 'skankbitch', 'skankee', 'skankey', 'skankfuck', 'skanks', 'skankwhore', 'skanky', 'skankybitch', 'skankywhore', 'skeet', 'skinflute', 'skribz', 'skullfuck', 'skum', 'skumbag', 'skurwysyn', 'skwa', 'skwe', 'slag', 'slanteye', 'slanty', 'slapper', 'sleezeball', 'slideitin', 'slimeball', 'slimebucket', 'slopehead', 'slopeheads', 'sloper', 'slopers', 'slopes', 'slopey', 'slopeys', 'slopies', 'slopy', 'slut', 'slutbag', 'slutbucket', 'slutdumper', 'slutkiss', 'sluts', 'slutt', 'slutting', 'slutty', 'slutwear', 'slutwhore', 'slutz', 'smack', 'smackthemonkey', 'smeg', 'smegma', 'smoker', 'smut', 'smutty', 'snatchpatch', 'snigger', 'sniggered', 'sniggering', 'sniggers', 'snowback', 'snowballing', 'snownigger', 'snuff', 'socksucker', 'sodom', 'sodomise', 'sodomite', 'sodomize', 'sodomy', 'son of a bitch', 'son of a whore', 'son-of-a-bitch', 'son-of-a-whore', 'sonofabitch', 'sonofbitch', 'sooties', 'sooty', 'souse', 'soused', 'soyboy', 'spac', 'spade', 'spades', 'spaghettibender', 'spaghettinigger', 'spank', 'spankthemonkey', 'spastic', 'spearchucker', 'spearchuckers', 'sperm', 'spermacide', 'spermbag', 'spermhearder', 'spermherder', 'sphencter', 'spic', 'spick', 'spicks', 'spics', 'spierdalaj', 'spig', 'spigotty', 'spik', 'spiks', 'spitter', 'splittail', 'splooge', 'spludge', 'spooge', 'spread legs', 'spreadeagle', 'spunk', 'spunky', 'sqeh', 'squa', 'squarehead', 'squareheads', 'squaw', 'squinty', 'squirting', 'stagg', 'steamy', 'stfu', 'stiffy', 'stoned', 'stoner', 'strap on', 'strapon', 'strappado', 'stringer', 'strip club', 'stripclub', 'stroke', 'stroking', 'stuinties', 'stupidfuck', 'stupidfucker', 'style doggy', 'suckdick', 'sucked', 'sucker', 'sucking', 'suckme', 'suckmyass', 'suckmydick', 'suckmytit', 'suckoff', 'sucks', 'suicide girl', 'suicide girls', 'suicidegirl', 'suicidegirls', 'suka', 'sultrywoman', 'sultrywomen', 'sumofabiatch', 'swallower', 'swalow', 'swamp guinea', 'swamp guineas', 'swastika', 'syphilis', 't i t', 't i ts', 't1t', 't1tt1e5', 't1tties', 'taboo', 'tacohead', 'tacoheads', 'taff', 'take off your', 'tar babies', 'tar baby', 'tarbaby', 'tard', 'taste my', 'tastemy', 'tawdry', 'tea bagging', 'teabagging', 'teat', 'teets', 'teez', 'terd', 'terror', 'terrorist', 'teste', 'testee', 'testes', 'testical', 'testicle', 'testicles', 'testis', 'thicklip', 'thicklips', 'thirdeye', 'thirdleg', 'threesome', 'threeway', 'throating', 'thumbzilla', 'thundercunt', 'tied up', 'tig ol bitties', 'tig old bitties', 'tight white', 'timber nigger', 'timber niggers', 'timbernigger', 'tinkle', 'tit', 'titbitnipply', 'titfuck', 'titfucker', 'titfuckin', 'titi', 'titjob', 'titlicker', 'titlover', 'tits', 'titt', 'tittie', 'tittie5', 'tittiefucker', 'titties', 'tittis', 'titty', 'tittyfuck', 'tittyfucker', 'tittys', 'tittywank', 'titwank', 'tity', 'to murder', 'toke', 'tongethruster', 'tongue in a', 'tongueina', 'tonguethrust', 'tonguetramp', 'toots', 'topless', 'tortur', 'torture', 'tosser', 'towel head', 'towel heads', 'towelhead', 'trailertrash', 'tramp', 'trannie', 'tranny', 'transsexual', 'transvestite', 'trashy', 'tribadism', 'triplex', 'trisexual', 'trois', 'trojan', 'trots', 'tub girl', 'tubgirl', 'tuckahoe', 'tunneloflove', 'turd burgler', 'turnon', 'tush', 'tushy', 'tw4t', 'twat', 'twathead', 'twatlips', 'twats', 'twatty', 'twatwaffle', 'twink', 'twinkie', 'two girls one cup', 'twobitwhore', 'twunt', 'twunter', 'udge packer', 'ukrop', 'unclefucker', 'undressing', 'unfuckable', 'upskirt', 'uptheass', 'upthebutt', 'urethra play', 'urethraplay', 'urophilia', 'usama', 'ussys', 'uzi', 'v a g i n a', 'v14gra', 'v1gra', 'v4gra', 'va-j-j', 'va1jina', 'vag', 'vag1na', 'vagiina', 'vaj1na', 'vajina', 'valium', 'venus mound', 'vgra', 'vibr', 'vibrater', 'vibrator', 'vigra', 'violet wand', 'virgin', 'virginbreaker', 'vittu', 'vixen', 'vjayjay', 'vodka', 'vomit', 'vorarephilia', 'voyeurweb', 'voyuer', 'vullva', 'vulva', 'w00se', 'w0p', 'wab', 'wad', 'wang', 'wank', 'wanker', 'wanking', 'wanky', 'waysted', 'wazoo', 'weenie', 'weewee', 'weiner', 'welcher', 'wench', 'wet dream', 'wetb', 'wetback', 'wetbacks', 'wetdream', 'wetspot', 'wh00r', 'wh0re', 'wh0reface', 'whacker', 'whash', 'whigger', 'whiggers', 'whiskeydick', 'whiskydick', 'whit', 'white power', 'white trash', 'whitenigger', 'whitepower', 'whites', 'whitetrash', 'whitey', 'whiteys', 'whities', 'whoar', 'whop', 'whoralicious', 'whore', 'whorealicious', 'whorebag', 'whored', 'whoreface', 'whorefucker', 'whorehopper', 'whorehouse', 'whores', 'whoring', 'wichser', 'wigga', 'wiggas', 'wigger', 'wiggers', 'willie', 'willies', 'williewanker', 'willy', 'wog', 'wogs', 'woose', 'wop', 'worldsex', 'wrapping men', 'wrinkled starfish', 'wtf', 'wuss', 'wuzzie', 'x-rated', 'x-rated2g1c', 'xkwe', 'xrated', 'xtc', 'xx', 'xxx', 'xxxxxx', 'yank', 'yaoi', 'yarpie', 'yarpies', 'yeasty', 'yed', 'yellow showers', 'yellowman', 'yellowshowers', 'yid', 'yids', 'yiffy', 'yobbo', 'yourboobs', 'yourpenis', 'yourtits', 'yury', 'zabourah', 'zigabo', 'zigabos', 'zipperhead', 'zipperheads', 'zoophile', 'zoophilia', '🖕'];
    }
};

Utils.returningUser = (Utils.getItem('TutorialIndex') ? 'existing_user' : 'new_user') + '';

Utils.gameName = Utils.gameName + '_' + (Utils.isMobile() ? 'mobile' : 'desktop') + '_' + Utils.returningUser;

//set first login
if (!Utils.getItem('FirstLogin')) {
    Utils.setItem('FirstLogin', Date.now());
}

Utils.isPointInAABB = function (point, bPos, halfExtends) {
    const aabbMin = {
        x: bPos.x - halfExtends.x,
        y: bPos.y - halfExtends.y,
        z: bPos.z - halfExtends.z
    };

    const aabbMax = {
        x: bPos.x + halfExtends.x,
        y: bPos.y + halfExtends.y,
        z: bPos.z + halfExtends.z
    };

    return (
        point.x >= aabbMin.x && point.x <= aabbMax.x &&
        point.y >= aabbMin.y && point.y <= aabbMax.y &&
        point.z >= aabbMin.z && point.z <= aabbMax.z
    );
};

//Utils.prefixCDN = 'https://data.onrushstats.com/';
// Analytics blackholed: routed to a same-origin nginx stub that returns {} so
// no gameplay analytics leave this server. See nginx location /hap-analytics/.
Utils.prefixCDN = '/hap-analytics/';
Utils.service = function (URL, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }
    ).join('&');

    var self = this;
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', Utils.prefixCDN + URL);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) {
            success(JSON.parse(xhr.responseText));
        }
    };
    //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    //xhr.withCredentials = true;

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
};

Utils.checkpointsArray = Utils.getItemAsArray('Checkpoints');
Utils.logCheckpoint = function (checkpoint) {
    if (Utils.checkpointsArray.indexOf(checkpoint) > -1) {
        return false;
    }

    console.log('[EVENT]', checkpoint);

    if (typeof PokiSDK !== 'undefined') {
        PokiSDK.customEvent('game', 'segment', { label: 'level', value: checkpoint + '' });
    }

    Utils.service('?request=save_data', {
        game_name: Utils.gameName,
        checkpoint: checkpoint
    }, function (data) {
        //console.log(data);
    });

    if (typeof GameAnalytics !== 'undefined') {
        GameAnalytics("addProgressionEvent", "Complete", checkpoint);
    }

    Utils.checkpointsArray.push(checkpoint);
    Utils.setItem('Checkpoints', JSON.stringify(Utils.checkpointsArray));
};

Utils.logError = function (error_stack) {
    Utils.service('?request=save_error', {
        game_name: Utils.shortName,
        error_stack: error_stack,
        is_mobile: Utils.isMobile() ? 'true' : false
    }, function (data) {
        //console.log(data);
    });
};

Utils.eventStart = Date.now();

Utils.getBrowser = function () {
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("chrome")) {
        return "Chrome";
    } else if (userAgent.includes("firefox")) {
        return "Firefox";
    } else if (userAgent.includes("safari")) {
        return "Safari";
    } else if (userAgent.includes("edge")) {
        return "Edge";
    } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
        return "Opera";
    } else {
        return "Unknown";
    }
};

Utils.copyToClipboard = function (text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => console.log('Copied to clipboard'))
            .catch(err => {
                console.error('Clipboard API failed:', err);
                fallbackCopyToClipboard(text);
            });
    } else {
        var input = document.createElement('input');
        input.value = text;
        input.style.position = 'fixed';
        input.style.opacity = 0;
        document.body.appendChild(input);
        input.select();
        try {
            document.execCommand('copy');
            console.log('Copied using fallback');
        } catch (err) {
            console.error('Fallback failed:', err);
        }
        document.body.removeChild(input);
    }
};

Utils.addEvent = function (event_name, value) {
    /*
    Utils.service('?request=add_event', {
        game_id: Utils.shortName,
        event: event_name + ':' + value,
        player_id: 'None'
    }, function (data) {
        //console.log(data);
    });
    */

    if (typeof PokiSDK !== 'undefined') {
        if (value) {
            PokiSDK.measure(Utils.shortName, event_name, value);
        } else {
            PokiSDK.measure(Utils.shortName, 'event', event_name);
        }
    }
};

Utils.addAdsEvent = function () {
    Utils.service('?request=add_ads_count', {
        game_name: Utils.shortName,
        version: Utils.dataVersion
    }, function (data) {
        //console.log(data);
    });
};

Utils.addTimeBasedEvent = function (event_name) {
    var time = Date.now() - Utils.eventStart;
    Utils.service('?request=add_time_based_event', {
        game_name: Utils.shortName,
        event_name: event_name,
        time: time
    }, function (data) {
        //console.log(data);
    });
};

Utils.addC2PEvent = function (event_name) {
    Utils.service('?request=add_c2p_event', {
        game_name: Utils.shortName,
        event_name: event_name,
        browser: Utils.getBrowser(),
        mobile: Utils.isMobile(),
        time: (Date.now() - Utils.eventStart) / 1000
    }, function (data) {
        //console.log(data);
    });
};

Utils.pageStartTime = Date.now();
Utils.startTime = Date.now();

//this increases player count
/*
Utils.service('?request=start_timer_v2', {
    game_name : Utils.shortName,
    version : Utils.dataVersion,
    mobile : Utils.isMobile() ? 'YES' : 'NO'
}, function(data){
    
});


setInterval(function(){
    var time = Date.now() - Utils.pageStartTime;
    var totalTime = Date.now() - Utils.startTime;
    var maxTime = 60 * 1000 * 60 * 2;

    if(totalTime <= maxTime){
        Utils.service('?request=save_timer_v2', {
            game_name : Utils.shortName,
            version : Utils.dataVersion,
            time : parseInt(time / 1000),
            mobile : Utils.isMobile() ? 'YES' : 'NO'
        }, function(data){
            
        });
    }

    Utils.pageStartTime = Date.now();
}, 1000 * 30);
*/

class EntityPoint {
    constructor(x, y, entity) {
        this.x = x;
        this.y = y;
        this.entity = entity;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(entity) {
        return (entity.x >= this.x - this.w &&
            entity.x < this.x + this.w &&
            entity.y >= this.y - this.h &&
            entity.y < this.y + this.h);
    }

    intersects(range) {
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);
    }
}

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.entities = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true;
    }

    insert(entity) {
        if (!this.boundary.contains(entity)) {
            return false;
        }

        if (this.entities.length < this.capacity) {
            this.entities.push(entity);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            if (this.northeast.insert(entity)) {
                return true;
            } else if (this.northwest.insert(entity)) {
                return true;
            } else if (this.southeast.insert(entity)) {
                return true;
            } else if (this.southwest.insert(entity)) {
                return true;
            }
        }
    }

    query(range, found) {
        if (!found) {
            found = [];
        }
        if (!this.boundary.intersects(range)) {
            return;
        } else {
            for (let e of this.entities) {
                if (range.contains(e)) {
                    found.push(e);
                }
            }
            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
        }
        return found;
    }

    show() {
        console.log(`Rectangle at (${this.boundary.x}, ${this.boundary.y}, ${this.boundary.w}, ${this.boundary.h})`);
        for (let e of this.entities) {
            console.log(`Entity at (${e.x}, ${e.y})`);
        }

        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
    }
}


class NURBS {
    /**
     * @param {number} degree 
     * @param {Array} controlPoints Array of {x, y, z} or pc.Vec3
     * @param {Array} weights Array of numbers
     * @param {boolean} isCyclic 
     */
    constructor(degree, controlPoints, weights, isCyclic = false) {
        this.degree = degree;
        this.isCyclic = isCyclic;
        this.originalCount = controlPoints.length;

        this.N = new Float64Array(degree + 1);
        this.left = new Float64Array(degree + 1);
        this.right = new Float64Array(degree + 1);

        this.pts = [];
        this.wts = [];
        this.knots = [];

        this.minU = 0;
        this.maxU = 0;

        this.setData(controlPoints, weights);
    }

    /**
     * Fully replaces the curve data
     */
    setData(controlPoints, weights) {
        this.originalCount = controlPoints.length;

        this.pts.length = 0;
        this.wts.length = 0;

        for (let i = 0; i < controlPoints.length; i++) {
            const p = controlPoints[i];
            this.pts.push({ x: p.x, y: p.y, z: p.z });
            this.wts.push(weights[i]);
        }

        if (this.isCyclic) {
            for (let i = 0; i < this.degree; i++) {
                const p = controlPoints[i];
                this.pts.push({ x: p.x, y: p.y, z: p.z });
                this.wts.push(weights[i]);
            }
            this._createPeriodicKnots();
        } else {
            this._createClampedKnots();
        }

        this.minU = this.knots[this.degree];
        this.maxU = this.knots[this.knots.length - 1 - this.degree];
    }

    /**
     * Safely updates a control point and its cyclic duplicate (if applicable)
     * @param {number} index The original index of the control point
     * @param {Object|pc.Vec3} position The new XYZ position
     * @param {number} [weight=null] Optional new weight
     */
    updateControlPoint(index, position, weight = null) {
        if (index < 0 || index >= this.originalCount) return;

        this.pts[index].x = position.x;
        this.pts[index].y = position.y;
        this.pts[index].z = position.z;

        if (weight !== null) {
            this.wts[index] = weight;
        }

        if (this.isCyclic && index < this.degree) {
            const mirrorIndex = this.originalCount + index;
            this.pts[mirrorIndex].x = position.x;
            this.pts[mirrorIndex].y = position.y;
            this.pts[mirrorIndex].z = position.z;

            if (weight !== null) {
                this.wts[mirrorIndex] = weight;
            }
        }
    }

    _createClampedKnots() {
        this.knots.length = 0;
        const count = this.pts.length;
        const knotCount = count + this.degree + 1;

        for (let i = 0; i < knotCount; i++) {
            if (i <= this.degree) this.knots.push(0);
            else if (i >= knotCount - this.degree - 1) this.knots.push(count - this.degree);
            else this.knots.push(i - this.degree);
        }
    }

    _createPeriodicKnots() {
        this.knots.length = 0;
        const count = this.pts.length;
        const totalKnots = count + this.degree + 1;

        for (let i = 0; i < totalKnots; i++) {
            this.knots.push(i);
        }
    }

    /**
     * Evaluates the curve at percentage T
     * @param {number} t Time from 0.0 (start) to 1.0 (end)
     * @param {Object|pc.Vec3} outVec3 The object to store the result in
     * @returns {Object|pc.Vec3} The populated outVec3
     */
    evaluate(t, outVec3) {
        const u = this.minU + t * (this.maxU - this.minU);
        const n = this.pts.length - 1;

        let span = this.degree;
        if (u >= this.knots[n + 1]) {
            span = n;
        } else {
            let low = this.degree, high = n + 1, mid = Math.floor((low + high) / 2);
            while (u < this.knots[mid] || u >= this.knots[mid + 1]) {
                if (u < this.knots[mid]) high = mid;
                else low = mid;
                mid = Math.floor((low + high) / 2);
            }
            span = mid;
        }

        const N = this.N;
        const left = this.left;
        const right = this.right;

        N[0] = 1.0;

        for (let j = 1; j <= this.degree; j++) {
            left[j] = u - this.knots[span + 1 - j];
            right[j] = this.knots[span + j] - u;
            let saved = 0.0;
            for (let r = 0; r < j; r++) {
                const denominator = right[r + 1] + left[j - r];
                const temp = (denominator === 0) ? 0.0 : (N[r] / denominator);

                N[r] = saved + right[r + 1] * temp;
                saved = left[j - r] * temp;
            }
            N[j] = saved;
        }

        let numX = 0, numY = 0, numZ = 0;
        let den = 0;

        for (let i = 0; i <= this.degree; i++) {
            const index = span - this.degree + i;
            const weight = N[i] * this.wts[index];
            const p = this.pts[index];

            numX += p.x * weight;
            numY += p.y * weight;
            numZ += p.z * weight;
            den += weight;
        }

        if (den === 0) {
            outVec3.x = 0; outVec3.y = 0; outVec3.z = 0;
            return outVec3;
        }

        outVec3.x = numX / den;
        outVec3.y = numY / den;
        outVec3.z = numZ / den;

        return outVec3;
    }
}

// ---------------------------------------------------------------------------
// Utils.mapsCDN — client for the Hide & Paint maps API (the backend in the
// hideandpaint-maps repo, fronted by hap-maps-cdn.onrushstats.com). A global
// object like `Utils` itself, callable from any script. It owns everything
// network: the base URL, request timeouts, the owner-token identity and every
// endpoint. Game scripts stay out of HTTP — CustomMapLoader builds maps it
// fetches from here, MapEditor/SaveMenu save+load through here, CustomGamesUI
// browses through here. Every public method returns a Promise.
// (Not to be confused with Utils.service/prefixCDN above, which talk to the
// analytics backend.)
// ---------------------------------------------------------------------------
Utils.mapsCDN = {
    // Base URL of the maps API. Masked: points at a same-origin nginx reverse
    // proxy (location /hap-maps/) that forwards server-side to the real backend
    // at hap-maps-cdn.onrushstats.com, so the browser only ever sees this domain.
    baseUrl: '/hap-maps',

    // Abort any single request that takes longer than this (ms).
    requestTimeoutMs: 15000,

    // localStorage key holding this player's unguessable owner token. The token
    // is the ONLY handle to a player's map collection, so it must stay secret
    // and stable.
    ownerStorageKey: 'HideAndPaint:OwnerId',

    _ownerId: null
};

// --- Owner identity — a 256-bit random token persisted on the client. Because
// a player's maps are listed by owner id, an unguessable token is what stops
// one player from enumerating or claiming another player's maps.
Utils.mapsCDN.getOwnerId = function () {
    if (!this._ownerId) this._ownerId = this._ensureOwnerId();
    return this._ownerId;
};

Utils.mapsCDN._ensureOwnerId = function () {
    var key = this.ownerStorageKey || 'HideAndPaint:OwnerId';
    var existing = null;
    try { existing = localStorage.getItem(key); } catch (e) { existing = null; }
    if (existing && existing.length >= 16) return existing;

    var token = this._randomToken(32); // 32 bytes => 64 hex chars (256 bits)
    try {
        localStorage.setItem(key, token);
    } catch (e) {
        console.error('[Utils.mapsCDN] could not persist owner id', e);
    }
    return token;
};

Utils.mapsCDN._randomToken = function (byteLen) {
    var bytes = new Uint8Array(byteLen);
    var cryptoObj = (typeof window !== 'undefined' && (window.crypto || window.msCrypto)) || null;
    if (cryptoObj && cryptoObj.getRandomValues) {
        cryptoObj.getRandomValues(bytes);
    } else {
        // Last-resort fallback (should never run in a real browser).
        console.warn('[Utils.mapsCDN] crypto.getRandomValues unavailable; using weak fallback');
        for (var i = 0; i < byteLen; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    var hex = '';
    for (var j = 0; j < bytes.length; j++) {
        hex += ('0' + bytes[j].toString(16)).slice(-2);
    }
    return hex;
};

// --- HTTP helper — fetch + JSON + timeout. Resolves parsed JSON (or null for
// 204), and rejects with a useful Error on any non-2xx / network / timeout.
// The owner header is attached only to same-API calls, never to the
// cross-origin CDN GET (a custom header there would force a preflight the CDN
// may not allow).
Utils.mapsCDN._base = function () {
    return (this.baseUrl || '').replace(/\/+$/, '');
};

// Rewrite the backend's absolute onrushstats hosts to same-origin proxy paths so
// every request the browser makes stays on this domain. The API host maps to
// /hap-maps and the map-content/thumbnail CDN maps to /hap-cdn (both are nginx
// reverse-proxy locations). Produces an absolute same-origin URL so _request's
// own /^https?:/ absolute-path test keeps treating a rewritten CDN link as a
// complete URL (not something to prepend the API base to). Leaves relative API
// paths and any non-string untouched.
Utils.mapsCDN._mask = function (u) {
    if (typeof u !== 'string') return u;
    var origin = (typeof location !== 'undefined' && location.origin) ? location.origin : '';
    return u
        .replace(/https?:\/\/hap-maps-cdn\.onrushstats\.com/gi, origin + '/hap-maps')
        .replace(/https?:\/\/hideandpaint-cdn\.onrushstats\.com/gi, origin + '/hap-cdn');
};

Utils.mapsCDN._request = function (method, path, body) {
    path = this._mask(path);
    var absolute = /^https?:/i.test(path);
    var url = absolute ? path : (this._base() + path);

    var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timeout = this.requestTimeoutMs || 15000;
    var timer = null;
    if (controller) {
        timer = setTimeout(function () { controller.abort(); }, timeout);
    }

    var opts = { method: method, headers: {} };
    if (controller) opts.signal = controller.signal;
    if (!absolute) {
        // Identify the owner on API calls (a no-op today; ready for real auth).
        opts.headers['x-owner-id'] = this.getOwnerId();
    }
    if (body !== undefined && body !== null) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(body);
    }

    return fetch(url, opts).then(function (res) {
        if (timer) clearTimeout(timer);
        if (res.status === 204) return null;
        return res.text().then(function (text) {
            var json = null;
            if (text) {
                try { json = JSON.parse(text); } catch (e) { json = null; }
            }
            if (!res.ok) {
                var msg = (json && (json.error || json.message)) || ('HTTP ' + res.status);
                var err = new Error(msg);
                err.status = res.status;
                err.body = json;
                throw err;
            }
            return json;
        });
    }, function (netErr) {
        if (timer) clearTimeout(timer);
        throw new Error('Network error contacting maps API: ' + ((netErr && netErr.message) || netErr));
    });
};

// --- Public API — every method returns a Promise. --------------------------

// Normalise a public map read-model into the light row the UI consumes:
// { id, name, updatedAt(ms), url, plays }.
Utils.mapsCDN._toRow = function (m) {
    return {
        id: m.id,
        name: m.title,
        updatedAt: m.updatedAt ? new Date(m.updatedAt).getTime() : 0,
        url: this._mask(m.url) || null,
        thumbnailUrl: this._mask(m.thumbnailUrl) || null,
        plays: m.plays || 0
    };
};

// GET a list endpoint that responds { items, count } and resolve an array of
// light rows. Shared by listMaps and the discovery browsers below.
Utils.mapsCDN._listFrom = function (path) {
    var self = this;
    return this._request('GET', path).then(function (res) {
        var items = (res && res.items) ? res.items : [];
        return items.map(function (m) { return self._toRow(m); });
    });
};

// List THIS player's maps. Pass one of the backend creator sort codes when
// ordering should happen at the API (for SaveMenu: plays_asc).
Utils.mapsCDN.listMaps = function (limit, sort) {
    var self = this;
    var lim = limit || 100;
    var owner = encodeURIComponent(this.getOwnerId());
    var basePath = '/users/' + owner + '/maps?limit=' + lim;
    var path = sort ? (basePath + '&sort=' + encodeURIComponent(sort)) : basePath;

    return this._listFrom(path).catch(function (err) {
        // The plays_asc backend change may not be deployed at the same moment as
        // the client. Fall back to the unsorted endpoint; SaveMenu applies the
        // same ascending play-count order locally.
        if (sort && err && err.status === 400) return self._listFrom(basePath);
        throw err;
    });
};

// --- Discovery lists (Custom Games browser). `opts` = { limit, offset }. ---

// Most-played maps for a rolling window ('daily' | 'weekly').
Utils.mapsCDN.popularMaps = function (opts) {
    opts = opts || {};
    var limit = opts.limit || 20;
    var offset = opts.offset || 0;
    var window = opts.window || 'daily';
    return this._listFrom('/maps/popular?window=' + encodeURIComponent(window) +
        '&limit=' + limit + '&offset=' + offset);
};

// Newest maps, most-recent first.
Utils.mapsCDN.newestMaps = function (opts) {
    opts = opts || {};
    var limit = opts.limit || 20;
    var offset = opts.offset || 0;
    return this._listFrom('/maps/newest?limit=' + limit + '&offset=' + offset);
};

// Editorially featured maps. The server retired GET /maps/featured, so this
// resolves an empty list (the browser's Featured tab shows its empty state)
// instead of erroring the whole tab.
Utils.mapsCDN.featuredMaps = function () {
    return Promise.resolve([]);
};

// Full-text search across public maps.
Utils.mapsCDN.searchMaps = function (query, opts) {
    opts = opts || {};
    var limit = opts.limit || 20;
    var offset = opts.offset || 0;
    return this._listFrom('/maps/search?q=' + encodeURIComponent(query || '') +
        '&limit=' + limit + '&offset=' + offset);
};

// Create a NEW map from serialized data. `data` must be MapEditor.serializeMap()
// output ({ format, name, items }). Resolves the created read model ({ id, ... }).
// Note: the save is buffered server-side and goes live after the next flush.
Utils.mapsCDN.createMap = function (name, data) {
    var body = { ownerId: this.getOwnerId(), title: name, data: data };
    Utils.addEvent('CreateNewMap');
    return this._request('POST', '/maps', body);
};

// Overwrite an existing map's data (rate-limited to <=1/sec/map server-side).
Utils.mapsCDN.saveMapData = function (id, data) {
    return this._request('PUT', '/maps/' + encodeURIComponent(id) + '/data', data);
};

// Upload a map thumbnail through the backend's direct-to-R2 flow: request a
// short-lived PUT URL, send the image bytes to R2, then finalize the upload so
// the backend promotes it and switches the map's public thumbnail pointer.
Utils.mapsCDN.uploadThumbnail = function (id, blob) {
    if (!id) return Promise.reject(new Error('Cannot upload a thumbnail without a saved map id'));
    if (!blob || typeof blob.size !== 'number') {
        return Promise.reject(new Error('Cannot upload an empty thumbnail'));
    }

    var self = this;
    var mapId = encodeURIComponent(id);
    var contentType = blob.type || 'image/png';

    return this._request('POST', '/maps/' + mapId + '/thumbnail-upload', {
        contentType: contentType
    }).then(function (ticket) {
        if (!ticket || !ticket.uploadId || !ticket.uploadUrl) {
            throw new Error('Maps API returned an invalid thumbnail upload ticket');
        }

        return self._putThumbnail(ticket.uploadUrl, ticket.requiredHeaders, blob)
            .then(function () {
                return self._request(
                    'POST',
                    '/maps/' + mapId + '/thumbnail-upload/' +
                    encodeURIComponent(ticket.uploadId) + '/complete'
                );
            });
    });
};

// Raw cross-origin PUT used only for presigned thumbnail URLs. Owner identity
// and JSON headers must not be added here; R2 expects the returned headers
// exactly and the image bytes as the request body.
Utils.mapsCDN._putThumbnail = function (url, requiredHeaders, blob) {
    var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timeout = this.requestTimeoutMs || 15000;
    var timer = null;

    if (controller) {
        timer = setTimeout(function () { controller.abort(); }, timeout);
    }

    var opts = {
        method: 'PUT',
        headers: requiredHeaders || { 'Content-Type': blob.type || 'image/png' },
        body: blob
    };
    if (controller) opts.signal = controller.signal;

    return fetch(url, opts).then(function (res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) throw new Error('Thumbnail storage upload failed with HTTP ' + res.status);
    }, function (netErr) {
        if (timer) clearTimeout(timer);
        throw new Error('Thumbnail storage upload failed: ' + ((netErr && netErr.message) || netErr));
    });
};

// Update a map's metadata (e.g. { title: 'New name' }). Resolves the updated
// read model.
Utils.mapsCDN.patchMap = function (id, patch) {
    return this._request('PATCH', '/maps/' + encodeURIComponent(id), patch);
};

// Load a map's data for EDITING (does not count a play). Resolves { format,name,items }.
Utils.mapsCDN.loadMap = function (id) {
    var self = this;
    return this._request('GET', '/maps/' + encodeURIComponent(id)).then(function (model) {
        if (!model || !model.url) throw new Error('Map has no live data yet');
        return self._request('GET', model.url);
    });
};

Utils.mapsCDN.loadMapData = function (id) {
    return this._request('GET', '/maps/' + encodeURIComponent(id)).then(function (data) {
        if (!data || data.error) throw new Error(data.message);
        return data;
    });
};

// Load a map's data for PLAYING (counts a click server-side; real "plays" are
// finisher reports sent by the game server, not the client). Resolves
// { format,name,items }.
Utils.mapsCDN.playMap = function (id) {
    var self = this;
    return this._request('GET', '/maps/' + encodeURIComponent(id) + '/data').then(function (model) {
        if (!model || !model.url) throw new Error('Map has no live data yet');
        return self._request('GET', model.url);
    });
};

// Soft-delete a map. Resolves when done.
Utils.mapsCDN.deleteMap = function (id) {
    return this._request('DELETE', '/maps/' + encodeURIComponent(id));
};
