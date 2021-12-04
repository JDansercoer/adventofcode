const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];
let input2 = [];

lineReader
  .on('line', function (line) {
    const items = [...line].map((bit) => parseInt(bit));
    input.push(items);
    input2 = input;
  })
  .addListener('close', () => {
    const firstLine = input[0];

    firstLine.forEach((bit, index) => {
      let sumOnIndex = 0;
      let sumOnIndex2 = 0;

      input.forEach((line) => {
        sumOnIndex = sumOnIndex + line[index];
      });

      input2.forEach((line) => {
        sumOnIndex2 = sumOnIndex2 + line[index];
      });

      const average = sumOnIndex / input.length;
      const average2 = sumOnIndex2 / input2.length;

      const roundedAverage = average >= 0.5 ? 1 : 0;
      console.log('roundedAverage: ', roundedAverage);
      const inverseOfRoundedAverage = average2 >= 0.5 ? 0 : 1;
      console.log('inverseOfRoundedAverage: ', inverseOfRoundedAverage);

      if (input.length > 1) {
        input = input.filter((line) => {
          return line[index] === roundedAverage;
        });
      }

      if (input2.length > 1) {
        input2 = input2.filter((line) => {
          return line[index] === inverseOfRoundedAverage;
        });
      }
    });

    const oxygenRating = parseInt(input[0].join(''), 2);
    console.log('input[0].join(): ', input[0].join(''));
    console.log('oxygenRating: ', oxygenRating);
    const co2Rating = parseInt(input2[0].join(''), 2);
    console.log('input2[0].join(): ', input2[0].join(''));
    console.log('co2Rating: ', co2Rating);

    const lifeSupportRating = oxygenRating * co2Rating;
    console.log('lifeSupportRating: ', lifeSupportRating);
  });
