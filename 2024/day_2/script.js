var part1 = (input) => 
{
    var count = 0;
    for (let report of input)
    {
        if (isSafe(report))
        {
            count++;
        }
    }
    return count;
}

var isSafe = (report) => 
{
    let signDirection = null;
    for (let i = 1; i < report.length; i++)
    {
        if (Math.abs(report[i] - report[i - 1]) <= 3 && (report[i] - report[i - 1] != 0) && (signDirection == null || Math.sign(report[i] - report[i - 1]) == signDirection))
        {
            // Got gotten with 20 20 20 21 20 for part 2
            signDirection = Math.sign(report[i] - report[i - 1]);
        }
        else
        {
            return false;
        }
    }
    return true;
}

var part2 = (input) => 
{
    var count = 0;
    var modifiedSafe = 0;
    for (let report of input)
    {
        if (isSafe(report))
        {
            count++;
        }
        else
        {
            for (let i = 0; i < report.length; i++)
            {
                var modifiedReport = report.filter((_, index) => index != i);
                if (isSafe(modifiedReport))
                {
                    modifiedSafe++;
                    break;
                }
            }
        }
    }
    return count + modifiedSafe;
}

var parse = (input) =>
{
    return input.map((val) => val.split(' '));;
}

var solve = (input) => 
{
    console.log(`part 1 result: ${part1(parse(input))}`);
    var testInput = 
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`.split('\n');
    console.log(`part 2 result: ${part2(parse(input))}`);
}

module.exports = solve;