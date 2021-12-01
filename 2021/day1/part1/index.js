const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    input.push(parseInt(line));
  })
  .addListener('close', () => {
    let previousHeight = 0;
    let amountOfIncreases = -1;

    input.forEach((height) => {
      if (height > previousHeight) {
        amountOfIncreases++;
      }

      previousHeight = height;
    });

    console.log(amountOfIncreases);
  });
