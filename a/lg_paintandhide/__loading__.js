pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        var news = document.createElement('div');
        news.id = 'news-area';
        news.innerHTML = `
            <h3>News</h3>
            <ul>
                <li>🏠 House level added!</li>
                <li>🖌️ Paint and seek mode added!</li>
                <li>📚 New maps added!</li>
                <li>👥 Play with friends added!</li>
                <li>🗺️ Map editor added!</li>
                <li>🎉 Party map added!</li>
            </ul>
        `;
        wrapper.appendChild(news);

        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var percentage = document.createElement('div');
        percentage.id = 'progress-percentage';
        container.appendChild(percentage);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        wrapper.appendChild(container);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');

        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        var percentage = document.getElementById('progress-percentage');
        if (bar && percentage) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
            percentage.innerText = Math.round(value * 100) + '%';
        }
    };

    var createCss = function () {
        var css = [
            ':root {',
            '   --bg_color_1: #01a0fd;',
            '   --bg_color_2: #01a0fd;',
            '}',
            '',
            'body {',
            '    background-color: var(--bg_color_1);',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: fixed;',
            '    top: 0;',
            '    left: 0;',
            '    width: 100vw;',
            '    height: 100vh;',
            '    height: 100dvh;',
            '    background-color: var(--bg_color_1);',
            '    background-image: url("loading-bg.jpg");',
            '    background-repeat: no-repeat;',
            '    background-position: center center;',
            '    background-size: cover;',
            '    overflow: hidden;',
            '    z-index: 999999;',
            '}',
            '',
            /* NEWS AREA */
            '#news-area {',
            '    position: absolute;',
            '    top: 20px;',
            '    left: 20px;',
            '    width: 300px;',
            '    background: rgba(0,0,0,0.55);',
            '    padding: 12px 16px;',
            '    border-radius: 8px;',
            '    color: white;',
            '    font-family: sans-serif;',
            '    z-index: 200;',
            '    backdrop-filter: blur(4px);',
            '}',
            '#news-area h3 {',
            '    margin: 0 0 6px 0;',
            '    font-size: 25px;',
            '    font-weight: bold;',
            '}',
            '#news-area ul {',
            '    margin: 0;',
            '    padding-left: 2px;',
            '    font-size: 20px;',
            '}',
            '#news-area li {',
            '    margin-bottom: 4px;',
            '    list-style: none;',
            '}',
            '',
            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 180px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '    z-index: 100;',
            '}',
            '',
            '#application-splash img {',
            '    width: 100%;',
            '}',
            '',
            '#progress-bar-container {',
            '    height: 30px;',
            '    width: 50vw;',
            '    position: fixed;',
            '    left: 50%;',
            '    bottom: 10%;',
            '    transform: translate(-50%, 0%);',
            '    background-color: rgba(0, 0, 0);',
            '    border-radius: 30px;',
            '    border: solid 5px #000;',
            '    overflow: hidden;',
            '}',
            '',
            '#progress-percentage {',
            '    position: absolute;',
            '    width: 100%;',
            '    height: 100%;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '    color: white;',
            '    font-weight: bold;',
            '    z-index: 1;',
            '}',
            '',
            '@keyframes rainbow {',
            '    0%   { background-position: 0% 50%; }',
            '    100% { background-position: 200% 50%; }',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background: linear-gradient(',
            '        90deg,',
            '        #ff0000,',
            '        #ff7f00,',
            '        #ffff00,',
            '        #00ff00,',
            '        #00ffff,',
            '        #0000ff,',
            '        #8b00ff,',
            '        #ff0000',
            '    );',
            '    background-size: 200% 100%;',
            '    animation: rainbow 3s linear infinite;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '',
            '    #application-splash-wrapper {',
            '       background-position: center center;',
            '       background-size: cover;',
            '    }',
            '',
            '    #progress-bar-container {',
            '       bottom: 5%;',
            '    }',
            '',
            '    #news-area {',
            '        display: none;',
            '        right: 10px;',
            '        max-width: 300px;',
            '        font-size: 12px;',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
