const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];
const foldStatements = [];

const countDots = (field) => {
  return field.reduce((total, row) => {
    return (
      total +
      row.reduce((rowTotal, el) => {
        return rowTotal + (el > 0 ? 1 : 0);
      }, 0)
    );
  }, 0);
};

lineReader
  .on('line', function (line) {
    if (line.includes(',')) {
      const coords = line.split(',').map((string) => parseInt(string));
      input.push(coords);
    }

    if (line.includes('fold')) {
      foldStatements.push(line.replace('fold along ', '').split('='));
    }
  })
  .addListener('close', () => {
    const maxXCoord = Math.max(...input.map(([xCoord]) => xCoord)) + 1;
    const maxYCoord = Math.max(...input.map(([, yCoord]) => yCoord)) + 1;

    let field = Array.from({ length: maxYCoord });
    field = field.map(() => Array.from({ length: maxXCoord }).fill(0));

    input.forEach(([xCoord, yCoord]) => {
      field[yCoord][xCoord] = 1;
    });

    [foldStatements[0]].forEach((statement) => {
      const axis = statement[0];
      const coord = parseInt(statement[1]);

      if (axis === 'y') {
        field.forEach((row, index) => {
          if (index > coord) {
            const newRow = index - (index - coord) * 2;
            row.forEach((el, xCoord) => {
              field[newRow][xCoord] += el;
            });
          }
        });
        field.splice(coord);
      }

      if (axis === 'x') {
        field.forEach((row) => {
          row.forEach((el, colIndex) => {
            if (colIndex > coord) {
              const newCol = colIndex - (colIndex - coord) * 2;
              row[newCol] += el;
            }
          });

          row.splice(coord);
        });
      }
    });

    console.log(countDots(field));
  });
