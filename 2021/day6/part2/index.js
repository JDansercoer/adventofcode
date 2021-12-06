const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

lineReader
  .on('line', function (line) {
    input = line.split(',').map((string) => parseInt(string));
  })
  .addListener('close', () => {
    const amountOfDays = 256;
    const groupedByDays = input.reduce(
      (groups, day) => {
        groups[day] = groups[day] + 1;

        return groups;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    );

    console.log('groupedByDays - initial ', groupedByDays);
    for (let index = 0; index < amountOfDays; index++) {
      const amountAtIndex0 = groupedByDays.shift();
      groupedByDays[6] = groupedByDays[6] + amountAtIndex0;
      groupedByDays.push(amountAtIndex0);
      console.log('groupedByDays - day ', index, JSON.stringify(groupedByDays));
    }

    const sum = groupedByDays.reduce((total, amountOnDay) => {
      return total + amountOnDay;
    }, 0);
    console.log('sum: ', sum);
  });
