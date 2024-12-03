const fs = require('node:fs');

var days = {
    1: require('./day_1/script.js'),
    2: require('./day_2/script.js'),
    3: require('./day_3/script.js'),
    4: () => {},
    5: () => {},
    6: () => {},
    7: () => {},
    8: () => {},
    9: () => {},
    10: () => {},
    11: () => {},
    12: () => {},
    13: () => {},
    14: () => {},
    15: () => {},
    16: () => {},
    17: () => {},
    18: () => {},
    19: () => {},
    20: () => {},
    21: () => {},
    22: () => {},
    23: () => {},
    24: () => {},
    25: () => {}
}

var current_day = process.argv[2];
if (!current_day || ! days[current_day])
{
    console.log("Use node index.js <day>");
    process.exit(0);
}

var input = fs.readFileSync(`./day_${current_day}/input.txt`, 'utf8').split('\n');


days[current_day](input);