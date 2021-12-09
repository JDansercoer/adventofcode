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
    let totalRiskLevel = 0;

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
          totalRiskLevel = totalRiskLevel + col + 1;
        }
      });
    });

    console.log('totalRiskLevel: ', totalRiskLevel);
  });
