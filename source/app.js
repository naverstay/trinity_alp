/* src/app.js */

// Styles
import 'styles/_app.scss';

require('./scripts/serializeForm');
require('./scripts/slideToggle');

//require('alpinejs/dist/alpine.js');
//require('alpinejs/dist/alpine-ie11.js');

if (/naverstay\.me/.test(location.origin)) {
    var scr = {
        "scripts": [
            {
                "src": "//cdn.jsdelivr.net/npm/eruda",
                "async": false,
                "onload": function () {
                    var c = document.createElement("script");
                    c.innerHTML = 'eruda.init();';
                    document.body.appendChild(c);
                }
            }
        ]
    };
    !function (win, doc, scr) {
        "use strict";
        var add = function (t) {
            if ("[object Array]" !== Object.prototype.toString.call(t)) return !1;
            for (var r = 0; r < t.length; r++) {
                var c = doc.createElement("script"), e = t[r];
                c.src = e.src;
                c.async = e.async;
                doc.body.appendChild(c);

                if ('onload' in e) {
                    c.onload = e.onload;
                }
            }
            return !0
        };
        win.addEventListener ?
            win.addEventListener("load", function () {
                add(scr.scripts);
            }, !1) :
            win.attachEvent ? win.attachEvent("onload", function () {
                    add(scr.scripts)
                }) :
                win.onload = function () {
                    add(scr.scripts)
                }
    }(window, document, scr);
}

function browserCheck() {
    let ie, myNav = navigator.userAgent.toLowerCase(),
        html = document.documentElement;

    if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
        html.classList.add('is-touch');
        console.log('touch');
    }

    if ((myNav.indexOf('msie') !== -1)) {
        ie = ((myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false);
        html.className += ' ie';
        html.className += ' ie' + ie;
    } else if (!!myNav.match(/trident.*rv\:11\./)) {
        ie = 11;
        html.className += ' ie' + ie;
    }

    if (myNav.indexOf('safari') !== -1) {
        if (myNav.indexOf('chrome') == -1) {
            html.className += ' safari';
        } else {
            html.className += ' chrome';
        }
    }

    if (myNav.indexOf('firefox') !== -1) {
        html.className += ' firefox';
    }

    if ((myNav.indexOf('windows') !== -1)) {
        html.className += ' windows';
    }

    if (navigator.platform.toLowerCase().indexOf('mac') !== -1) {
        html.className += ' macos';
    }
}

browserCheck();
