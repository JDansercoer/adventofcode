const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

const printField = (field) => {
  field.forEach((row) => {
    console.log(JSON.stringify(row));
  });
};

lineReader
  .on('line', function (line) {
    const coords = line.split('->').map((str) => str.trim());
    const start = coords[0].split(',');
    const end = coords[1].split(',');

    const processedCoords = {
      startX: parseInt(start[0]),
      startY: parseInt(start[1]),
      endX: parseInt(end[0]),
      endY: parseInt(end[1]),
    };

    input.push(processedCoords);
  })
  .addListener('close', () => {
    let maxX = 0;
    let maxY = 0;
    input.forEach((line) => {
      if (line.startX > maxX) {
        maxX = line.startX;
      }
      if (line.endX > maxX) {
        maxX = line.endX;
      }
      if (line.startY > maxY) {
        maxY = line.startY;
      }
      if (line.endY > maxY) {
        maxY = line.endY;
      }
    });

    const field = Array.from({ length: maxY + 1 }).map(() => {
      return Array.from({ length: maxX + 1 }).fill(0);
    });

    input.forEach((line) => {
      const { startX, startY, endX, endY } = line;

      if (startX !== endX && startY !== endY) {
        return;
      }

      if (startX !== endX) {
        const start = Math.min(startX, endX);
        const end = Math.max(startX, endX);

        for (let index = start; index <= end; index++) {
          field[startY][index] = field[startY][index] + 1;
        }
      }
      if (startY !== endY) {
        const start = Math.min(startY, endY);
        const end = Math.max(startY, endY);
        for (let index = start; index <= end; index++) {
          field[index][startX] = field[index][startX] + 1;
        }
      }
    });

    let fields2OrMore = 0;
    field.forEach((row) => {
      row.forEach((cell) => {
        if (cell >= 2) {
          fields2OrMore++;
        }
      });
    });
    console.log('fields2OrMore: ', fields2OrMore);
  });
