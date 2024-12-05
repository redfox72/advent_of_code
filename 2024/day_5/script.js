var isValid = (pageList, input) => 
{
    var valid = true;
    var seen = [];
    for (page of pageList)
    {
        for (var before of seen)
        {
            if (input.pageOrders[page] && input.pageOrders[page].includes(before))
            {
                valid = false;
                break;
            }
        }
        if (!valid)
        {
            break;
        }
        seen.push(page);
    }
    return valid;
}

var part1 = (input) => 
{
    var result = 0;
    for (pageList of input.pageLists)
    {
        if (isValid(pageList, input))
        {
            result += +pageList[Math.floor(pageList.length / 2)];
        }
    }
    return result;
}

var part2 = (input) => 
{
    var invalidEntries = [];
    for (pageList of input.pageLists)
    {
        if (!isValid(pageList, input))
        {
           invalidEntries.push(pageList);
        }
    }
    console.log(invalidEntries);
    var result = 0;
    for (var pageList of invalidEntries)
    {
        pageList.sort((a, b) => 
        {
            if (input.pageOrders[a] && input.pageOrders[a].includes(b))
            {
                return -1;
            }
            else if (input.pageOrders[b] && input.pageOrders[b].includes(a))
            {
                return 1;
            }
            return 0;
        });
        result += +pageList[Math.floor(pageList.length / 2)];
    }
    return result;
}

var parse = (input) =>
{
    var result = 
    {
        pageOrders: {},
        pageLists: [],
    }

    var i = 0;
    while (input[i] != '')
    {
        var split = input[i].split('|');
        if (result.pageOrders[split[0]] == undefined)
        {
            result.pageOrders[split[0]] = [];
        }
        result.pageOrders[split[0]].push(split[1]);
        i++;
    }
    i++;
    while (i < input.length)
    {
        result.pageLists.push(input[i].split(','));
        i++;
    }
    return result;
}

var solve = (input) => 
{
    var testInput = 
`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.split('\n');
    console.log(`part 1 result: ${part1(parse(input))}`);
    console.log(`part 2 result: ${part2(parse(input))}`);
}

module.exports = solve;