const index = require("./index");

(() => {
    if (typeof(window) !== 'undefined') {
        window.HitOn = index;
    } else {
        global.HitOn = index;
    }
})();
