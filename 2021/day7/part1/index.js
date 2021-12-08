const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

const calculateMedian = (values) => {
  if (values.length === 0) throw new Error('No inputs');

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

lineReader
  .on('line', function (line) {
    input = line.split(',').map((string) => parseInt(string));
  })
  .addListener('close', () => {
    const sumOfPositions = input.reduce(
      (total, position) => total + position,
      0,
    );

    const median = calculateMedian(input);
    console.log('median: ', median);

    const fuelUsage = input.reduce(
      (spentFuel, position) => Math.abs(position - median) + spentFuel,
      0,
    );
    console.log('fuelUsage: ', fuelUsage);
  });
