const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

let gamma = '';
let epsilon = '';

lineReader
  .on('line', function (line) {
    const items = [...line].map((bit) => parseInt(bit));
    input.push(items);
  })
  .addListener('close', () => {
    const firstLine = input[0];
    console.log('firstLine: ', firstLine);

    firstLine.forEach((bit, index) => {
      let sumOnIndex = 0;

      input.forEach((line) => {
        sumOnIndex = sumOnIndex + line[index];
      });

      const roundedAverage = Math.round(sumOnIndex / input.length);

      gamma = gamma + roundedAverage.toString();
      epsilon = epsilon + (roundedAverage === 1 ? 0 : 1).toString();
    });

    const gammaNumber = parseInt(gamma, 2);
    console.log('gammaNumber: ', gammaNumber);
    const epsilonNumber = parseInt(epsilon, 2);
    console.log('epsilonNumber: ', epsilonNumber);

    console.log(gammaNumber * epsilonNumber);
  });
