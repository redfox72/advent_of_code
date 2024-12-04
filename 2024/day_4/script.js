var part1 = (input) => 
{
    /**
     * 
     * Horizontal -> 8
     * Vertical -> 4
     * Diagonal (normal) -> 5
     * Diagonal (leftwards) -> 5
     * ....XXMAS.
       .SAMXMS...
       ...S..A...
       ..A.A.MS.X
       XMASAMX.MM
       X.....XA.A
       S.S.S.S.SS
       .A.A.A.A.A
       ..M.M.M.MM
       .X.X.XMASX
     */
    allValues = [...input.horizontal, ...input.horizontalBack, ...input.vertical, ...input.verticalBack, ...input.diagonal, ...input.leftDiagonal, ...input.leftDiagonalBack, ...input.diagonalBack].filter((val) => val.length >= 4);
    // allValues = [...input.leftDiagonal, ...input.leftDiagonalBack];
    // allValues = allValues.filter((val) => val.startsWith('ASAMXXMASMAX'));
    var count = 0;
    var limit = allValues.length;
    for (let i = 0; i < limit; i++)
    {
        var currentString = allValues[i];
        var location = currentString.lastIndexOf('XMAS');
        var remaining = currentString.substring(0, location);
        while (location >= 0)
        {
            count++;
            location = remaining.lastIndexOf('XMAS');
            remaining = remaining.substring(0, location);
        }
        
        // count += remaining.split('').filter((val) => val == 'X').length;
        if (remaining.length > 0) count++;
    }
    return count;
}

var part2 = (input) => 
{
    console.log(input.horizontal.map((val) => val.replaceAll('X', '.')));
    /**
     * M . M
     * . A .
     * S . S
     */

    var allValues = input.horizontal;
    var count = 0;
    for (let i = 0; i < allValues.length - 2; i++)
    {
        for (let j = 0; j < allValues[i].length; j++)
        {
            var first = allValues[i][j] + allValues[i + 1][j + 1] + allValues[i + 2][j + 2];
            var second = allValues[i + 2][j] + allValues [i + 1][j + 1] + allValues[i][j + 2];
            if ((first == 'MAS' || first == 'SAM') && (second == 'MAS' || second == 'SAM'))
            {
                count++;
            }
        }
    }
    return count;
}

var parse = (input) =>
{
    var result = 
    {
        horizontal: [],
        vertical: [],
        diagonal: [],
        leftDiagonal: [],
        horizontalBack: [],
        verticalBack: [],
        diagonalBack: [],
        leftDiagonalBack: [],
    };

    result.horizontal = [...input];
    
    for (var i = 0; i < input[0].length; i++)
    {
        result.vertical.push(input.map((val) => val.split('').filter((_, index) => index == i)).reduce((left, right) => left + right));
    }

    for (var i = 0; i < input[0].length; i++)
    {
        var diagonal = '';
        var leftDiagonal = '';
        var j = i;
        while (true)
        {
            if (j - i >= input.length || j == input[0].length)
                break;
            diagonal += input[j - i][j];
            leftDiagonal += input[j - i][input[j - i].length - j - 1];
            j++;
        }
        result.diagonal.push(diagonal);
        result.leftDiagonal.push(leftDiagonal);
    }

    for (var i = 1; i < input.length; i++)
    {
        var diagonal = '';
        var leftDiagonal = '';
        var j = i;
        while (true)
        {
            if (j == input.length || j - i >= input[0].length)
                break;
            diagonal += input[j][j - i];
            leftDiagonal += input[j][input[j].length - (j - i)- 1];
            j++;
        }
        result.diagonal.push(diagonal);
        result.leftDiagonal.push(leftDiagonal);
    }

    result.horizontalBack = result.horizontal.map((val) => val.split('').toReversed().join(''));
    result.verticalBack = result.vertical.map((val) => val.split('').toReversed().join(''));
    result.diagonalBack = result.diagonal.map((val) => val.split('').toReversed().join(''));
    result.leftDiagonalBack = result.leftDiagonal.map((val) => val.split('').toReversed().join(''));

    return result;
}

var solve = (input) => 
{
    var testInput = 
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split('\n');
    console.log(`part 1 result: ${part1(parse(input))}`);
    console.log(`part 2 result: ${part2(parse(input))}`);
}

module.exports = solve;