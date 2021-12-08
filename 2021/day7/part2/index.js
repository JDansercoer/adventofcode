const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    input = line.split(',').map((string) => parseInt(string));
  })
  .addListener('close', () => {
    const sumOfPositions = input.reduce(
      (total, position) => total + position,
      0,
    );

    const average = Math.round(sumOfPositions / input.length);
    console.log('average: ', average);

    const fuelUsage = input.reduce((totalFuel, position) => {
      const distance = Math.abs(position - average);

      const fuelUsage = Array.from({ length: distance }).reduce(
        (total, el, index) => {
          return total + (index + 1);
        },
        0,
      );

      return totalFuel + fuelUsage;
    }, 0);
    console.log('fuelUsage: ', fuelUsage);
  });
