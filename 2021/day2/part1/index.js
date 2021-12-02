const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    const [direction, amount] = line.split(' ');
    input.push({ direction, amount: parseInt(amount) });
  })
  .addListener('close', () => {
    let horizontal = 0;
    let depth = 0;

    input.forEach((command) => {
      if (command.direction === 'forward') {
        horizontal = horizontal + command.amount;
      } else if (command.direction === 'down') {
        depth = depth + command.amount;
      } else if (command.direction === 'up') {
        depth = depth - command.amount;
      } else {
        console.log('unknown command');
      }
    });

    console.log(horizontal * depth);
  });
