/* src/app.js */

// Styles
import 'styles/_app.scss';

//require('alpinejs/dist/alpine.js');
//require('alpinejs/dist/alpine-ie11.js');

console.log('app.js');

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

document.addEventListener('DOMContentLoaded', function () {
    console.log('Ready!');

    require('./scripts/slideToggle');
    //require('scripts/demo');
});


