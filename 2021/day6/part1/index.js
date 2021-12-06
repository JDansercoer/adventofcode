const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    input = line.split(',').map((string) => parseInt(string));
  })
  .addListener('close', () => {
    const amountOfDays = 80;

    for (let index = 0; index < amountOfDays; index++) {
      input.forEach((fishTimer, index) => {
        if (fishTimer > 0) {
          input[index] = input[index] - 1;
        } else if (fishTimer === 0) {
          input[index] = 6;
          input.push(8);
        }
      });
    }

    console.log(input.length);
  });
