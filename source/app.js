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

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

function browserCheck() {
    var ie, userAgent = navigator.userAgent.toLowerCase(),
        html = document.documentElement;

    if ((userAgent.indexOf('msie') !== -1)) {
        ie = ((userAgent.indexOf('msie') !== -1) ? parseInt(userAgent.split('msie')[1]) : false);
        html.className += ' ie';
        html.className += ' ie' + ie;
    } else if (!!userAgent.match(/trident.*rv\:11\./)) {
        ie = 11;
        html.className += ' ie' + ie;
    }

    if (userAgent.indexOf('safari') !== -1) {
        if (userAgent.indexOf('chrome') === -1) {
            html.className += ' safari';
        } else {
            html.className += ' chrome';
        }
    }

    if (userAgent.indexOf('firefox') !== -1) {
        html.className += ' firefox';
    }

    var platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = '';

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'macos';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'ios';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'windows';
    } else if (/android/.test(userAgent)) {
        os = 'android';
    } else if (!os && /linux/.test(platform)) {
        os = 'linux';
    }

    html.className += os ? ' ' + os : '';
}

browserCheck();

var itemCounter = document.getElementById('item_count');

if (itemCounter) {
    setInputFilter(itemCounter, function (value) {
        return /^[1-9][0-9]*$/.test(value);
    });
}

window.smoothScrollTo = function (target, startY, endY, duration) {
    let distanceY = endY - startY;
    let startTime = new Date().getTime();

    function easeInOutQuart(time, from, distance, duration) {
        if ((time /= duration / 2) < 1) {
            return distance / 2 * Math.pow(time, 4) + from;
        }

        return -distance / 2 * ((time -= 2) * Math.pow(time, 3) - 2) + from;
    }

    let timer = window.setInterval(() => {
        let time = new Date().getTime() - startTime;
        let newY = easeInOutQuart(time, startY, distanceY, duration);

        if (time >= duration) {
            window.clearInterval(timer);
        }

        target.scrollTo(0, newY);
    }, 1000 / 60);
}

document.addEventListener('DOMContentLoaded', function () {
    var totalBox = document.getElementById('total_box'),
        totalBoxWrapper = document.getElementById('stuck_wrapper'),
        temp,
        isSticky;

    window.fixTotalBox = function () {
        if (!totalBox) return;

        var totalBoxHeight = totalBox.offsetHeight;

        isSticky = totalBox.classList.contains('stuck');
        temp = totalBoxWrapper;

        if (!temp) return;

        if ((temp.getBoundingClientRect().top + totalBoxHeight) > window.innerHeight) {
            if (!isSticky) {
                totalBoxWrapper.style.height = totalBoxHeight + 'px';
                totalBox.classList.add('stuck');
            }
        } else {
            if (isSticky) {
                totalBoxWrapper.style.height = '';
                totalBox.classList.remove('stuck');
            }
        }
    }

    window.addEventListener('scroll', function (e) {
        document.body.classList[ window.pageYOffset > window.innerHeight ? 'add' : 'remove']('go__top-show');
        window.fixTotalBox();
    });

    window.fixTotalBox();

    let scrollTo = document.querySelectorAll('.scrollTo');

    if (scrollTo.length) {
        for (let i = 0; i < scrollTo.length; i++) {
            const btn = scrollTo[i];

            btn.addEventListener("click", function (e) {
                var target = document.getElementById(e.target.dataset.target);

                if (target) {
                    window.smoothScrollTo(window, window.pageYOffset, window.pageYOffset + target.getBoundingClientRect().top - 20, 1000);
                }

                return false;
            });
        }
    }
});
