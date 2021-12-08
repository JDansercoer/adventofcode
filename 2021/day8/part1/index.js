const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    const [inputValue, outputValue] = line.split('|');
    const inputArray = inputValue.trim().split(' ');
    const outputArray = outputValue.trim().split(' ');
    input.push([inputArray, outputArray]);
  })
  .addListener('close', () => {
    let amountOf1s = 0;
    let amountOf4s = 0;
    let amountOf7s = 0;
    let amountOf8s = 0;

    input.forEach(([inputArray, outputArray]) => {
      outputArray.forEach((pattern) => {
        if (pattern.length === 2) {
          amountOf1s++;
        }
        if (pattern.length === 4) {
          amountOf4s++;
        }
        if (pattern.length === 3) {
          amountOf7s++;
        }
        if (pattern.length === 7) {
          amountOf8s++;
        }
      });
    });

    const totalUniqueNumbers =
      amountOf1s + amountOf4s + amountOf7s + amountOf8s;
    console.log('totalUniqueNumbers: ', totalUniqueNumbers);
  });
