const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    const heights = line.split('').map((string) => parseInt(string));
    input.push(heights);
  })
  .addListener('close', () => {
    const lowPoints = [];

    input.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const pointLeft = colIndex > 0 ? input[rowIndex][colIndex - 1] : 999;
        const pointRight =
          colIndex < row.length - 1 ? input[rowIndex][colIndex + 1] : 999;
        const pointUp = rowIndex > 0 ? input[rowIndex - 1][colIndex] : 999;
        const pointDown =
          rowIndex < input.length - 1 ? input[rowIndex + 1][colIndex] : 999;

        if (
          col < pointLeft &&
          col < pointRight &&
          col < pointUp &&
          col < pointDown
        ) {
          lowPoints.push([colIndex, rowIndex]);
        }
      });
    });

    const basins = lowPoints.map(([colIndex, rowIndex]) => {
      let pointsInBasin = [[colIndex, rowIndex]];
      input[rowIndex][colIndex] = 9;

      const checkNeighors = ([colIndex, rowIndex]) => {
        const pointLeft = colIndex > 0 ? input[rowIndex][colIndex - 1] : 9;
        const pointRight =
          colIndex < input[0].length - 1 ? input[rowIndex][colIndex + 1] : 9;
        const pointUp = rowIndex > 0 ? input[rowIndex - 1][colIndex] : 9;
        const pointDown =
          rowIndex < input.length - 1 ? input[rowIndex + 1][colIndex] : 9;
        const pointsToCheck = [];

        if (!pointsInBasin.includes(pointLeft) && pointLeft < 9) {
          pointsInBasin.push([colIndex - 1, rowIndex]);
          input[rowIndex][colIndex - 1] = 9;
          pointsToCheck.push([colIndex - 1, rowIndex]);
        }
        if (!pointsInBasin.includes(pointRight) && pointRight < 9) {
          pointsInBasin.push([colIndex + 1, rowIndex]);
          input[rowIndex][colIndex + 1] = 9;
          pointsToCheck.push([colIndex + 1, rowIndex]);
        }
        if (!pointsInBasin.includes(pointUp) && pointUp < 9) {
          pointsInBasin.push([colIndex, rowIndex - 1]);
          input[rowIndex - 1][colIndex] = 9;
          pointsToCheck.push([colIndex, rowIndex - 1]);
        }
        if (!pointsInBasin.includes(pointDown) && pointDown < 9) {
          pointsInBasin.push([colIndex, rowIndex + 1]);
          input[rowIndex + 1][colIndex] = 9;
          pointsToCheck.push([colIndex, rowIndex + 1]);
        }

        pointsToCheck.forEach((point) => {
          checkNeighors(point);
        });
      };

      checkNeighors([colIndex, rowIndex]);

      return pointsInBasin;
    });

    const basinLengths = basins
      .map((basin) => basin.length)
      .sort((a, b) => b - a);
    const [largest, second, third, ...rest] = basinLengths;
    console.log('Product of basins:', largest * second * third);
  });
