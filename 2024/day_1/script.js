

var part1 = (input) => 
{
    input.left.sort();
    input.right.sort();
    var result = 0;
    for (let i = 0; i < input.left.length; i++)
    {
        result += Math.abs(input.left[i] - input.right[i]);
    }
    return result;
}

var part2 = (input) => 
{
    input.right = input.right.reduce((previous, current) => {
        previous[current] != undefined ? previous[current]++ : previous[current] = 1;
        return previous;
    }, {});
    var result = 0;
    input.left.forEach((val) => result += val * (input.right[val] == undefined ? 0 : input.right[val]));
    return result;
}

var parse = (input) =>
{
    var left = [];
    var right = [];
    input.forEach((line) => {
        split = line.split('   ')
        left.push(split[0]);
        right.push(split[1]);
    });
    return {left, right};
}

var day1 = (input) => 
{
    console.log(`part 1 result: ${part1(parse(input))}`);
    console.log(`part 2 result: ${part2(parse(input))}`);
}

module.exports = day1;