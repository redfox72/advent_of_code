var part1 = (input) => 
{
    var pattern = /mul\(\d+,\d+\)/g;
    var parsePattern = /mul\((\d+),(\d+)\)/
    var arr = [...input.matchAll(pattern)].map((val) => val[0]);
    var result = 0;
    for (let i = 0; i < arr.length; i++)
    {
        var parsed = arr[i].match(parsePattern);
        result += (+parsed[1]) * (+parsed[2]);
    }
    return result;
}

var part2 = (input) => 
{
    var pattern = /mul\(\d+,\d+\)/g;
    input = input.split('do()').map((val) => val.split(`don't()`)[0]).reduce((left, right) => left + right);
    var parsePattern = /mul\((\d+),(\d+)\)/
    var arr = [...input.matchAll(pattern)].map((val) => val[0]);
    var result = 0;
    for (let i = 0; i < arr.length; i++)
    {
        var parsed = arr[i].match(parsePattern);
        result += (+parsed[1]) * (+parsed[2]);
    }
    return result;
}

var parse = (input) =>
{
    return input.reduce((left, right) => left + right);
}

var solve = (input) => 
{
    console.log(`part 1 result: ${part1(parse(input))}`);
    console.log(`part 2 result: ${part2(parse(input))}`);
}

module.exports = solve;