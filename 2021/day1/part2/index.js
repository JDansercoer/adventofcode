const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    input.push(parseInt(line));
  })
  .addListener('close', () => {
    let previousTotal = 0;
    let amountOfIncreases = -1;

    input.forEach((value, index) => {
      if (index < 2) {
        return;
      }

      const total = value + input[index - 1] + input[index - 2];

      if (total > previousTotal) {
        amountOfIncreases++;
      }

      previousTotal = total;
    });

    console.log(amountOfIncreases);
  });
