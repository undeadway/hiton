const { aspectBase } = require("./..//lib/utils");
let esacpes = aspectBase("esacpes");

const ESCAPER_REGX = /\\(\S)/;

function replaceEscapes () {
    esacpes.before = input => {
        while (matched = (ESCAPER_REGX.exec(input)) !== null) {
            let [ proto, text ] = matched;
            input = esacpes.replace(input, proto, text);
        }
        return input;
    };
    
    return esacpes;
}

module.exports = exports = replaceEscapes;
