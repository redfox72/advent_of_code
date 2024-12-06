var part1 = (input) => 
{
    var count = 1;
    var guardPosition = input.guardPosition;
    var grid = input.grid;
    while (true)
    {
        if (guardPosition.x + guardPosition.xDir < 0 || guardPosition.x + guardPosition.xDir >= grid[0].length ||
            guardPosition.y + guardPosition.yDir < 0 || guardPosition.y + guardPosition.yDir >= grid.length)
        {
            return count;
        }
        else
        {
            if (grid[guardPosition.y + guardPosition.yDir][guardPosition.x + guardPosition.xDir] == '#')
            {
                rotate(guardPosition);
            }
            else
            {
                if (grid[guardPosition.y + guardPosition.yDir][guardPosition.x + guardPosition.xDir] == ' ')
                {
                    count++;
                    grid[guardPosition.y + guardPosition.yDir][guardPosition.x + guardPosition.xDir] = 'X';
                }
                guardPosition.y += guardPosition.yDir;
                guardPosition.x += guardPosition.xDir;
            }
        }
    }
}

var rotate = (guardPosition) =>
{
    if (guardPosition.xDir == 0)
    {
        guardPosition.xDir = -guardPosition.yDir;
        guardPosition.yDir = 0;
    } else
    {
        guardPosition.yDir = guardPosition.xDir;
        guardPosition.xDir = 0;
    }
}

var checkLoop = (grid, guardPosition, newObstacle) =>
{
    grid = JSON.parse(JSON.stringify(grid));
    guardPosition = JSON.parse(JSON.stringify(guardPosition));
    grid[newObstacle.y][newObstacle.x] = '#';
    var seenObstacles = [];
    var lastPosition = [-1, -1];
    while (true)
    {
        if (guardPosition.x + guardPosition.xDir < 0 || guardPosition.x + guardPosition.xDir >= grid[0].length ||
            guardPosition.y + guardPosition.yDir < 0 || guardPosition.y + guardPosition.yDir >= grid.length)
        {
            return false;
        }
        else
        {
            if (grid[guardPosition.y + guardPosition.yDir][guardPosition.x + guardPosition.xDir] == '#')
            {
                var newObstacle = [guardPosition.x, guardPosition.y, guardPosition.xDir, guardPosition.yDir];
                rotate(guardPosition);
                for (var seenObstacle of seenObstacles)
                {
                    if (seenObstacle[0] == newObstacle[0] && seenObstacle[1] == newObstacle[1] && seenObstacle[2] == newObstacle[2] && seenObstacle[3] == newObstacle[3])
                    {
                        return true;
                    }
                }
                seenObstacles.unshift(newObstacle);
            }
            else
            {
                if (grid[guardPosition.y + guardPosition.yDir][guardPosition.x + guardPosition.xDir] == ' ')
                {
                    grid[guardPosition.y + guardPosition.yDir][guardPosition.x + guardPosition.xDir] = 'X';
                }
                lastPosition = [guardPosition.x, guardPosition.y];
                guardPosition.y += guardPosition.yDir;
                guardPosition.x += guardPosition.xDir;
            }
        }
    }
}

var part2 = (input) => 
{
    var count = 0;
    var guardPosition = JSON.parse(JSON.stringify(input.guardPosition));
    var grid = JSON.parse(JSON.stringify(input.grid));
    var validObstacleSpots = [];
    for (var i = 0; i < grid.length; i++)
    {
        for (var x = 0; x < grid[i].length; x++)
        {
            if (x == input.guardPosition.x && (i == input.guardPosition.y) || grid[i][x] == '#')
            {
                continue;
            }
            validObstacleSpots.push({x, y: i});
        }
    }
    count = 0;
    for (var newObstacle of validObstacleSpots)
    {
        // console.log(`${validObstacleSpots.indexOf(newObstacle)}/${validObstacleSpots.length}`);
        if (checkLoop(input.grid, guardPosition, newObstacle))
        {
            count++;
        }
    }
    return count;
}

var parse = (input) =>
{
    var grid = [];
    var guardPosition = {x: 0, y: 0, xDir: 0, yDir: -1};
    for (let line of input)
    {
        var split = line.split('').map((val) => val == '.' ? ' ' : val)
        grid.push(split);
        if (split.includes('^'))
        {
            guardPosition.y = grid.length;
            guardPosition.x = line.indexOf('^');
            split[guardPosition.x] = 'X';
        }
    }
    return {grid, guardPosition};
}

var solve = (input) => 
{
    var testInput = 
``.split('\n');
    console.log(`part 1 result: ${part1(parse(input))}`);
    console.log(`part 2 result: ${part2(parse(input))}`);
}

module.exports = solve;