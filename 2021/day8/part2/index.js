const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let input = [];

const areStringEqualInChars = (string1, string2) => {
  if (string1.length !== string2.length) {
    return false;
  }

  const string2Chars = string2.split('');
  const filtered2Chars = string2Chars.filter((char) => {
    if (string1.includes(char)) {
      return true;
    }
  });

  return string2Chars.length === filtered2Chars.length;
};

lineReader
  .on('line', function (line) {
    const [inputValue, outputValue] = line.split('|');
    const inputArray = inputValue.trim().split(' ');
    const outputArray = outputValue.trim().split(' ');
    input.push([inputArray, outputArray]);
  })
  .addListener('close', () => {
    let total = 0;
    input.forEach(([inputArray, outputArray]) => {
      const one = inputArray.find((pattern) => pattern.length === 2);
      console.log('one: ', one);
      const four = inputArray.find((pattern) => pattern.length === 4);
      console.log('four: ', four);
      const seven = inputArray.find((pattern) => pattern.length === 3);
      console.log('seven: ', seven);
      const eight = inputArray.find((pattern) => pattern.length === 7);
      console.log('eight: ', eight);

      const six = inputArray.find((pattern) => {
        if (
          pattern.length === 6 &&
          !(pattern.includes(one[0]) && pattern.includes(one[1]))
        ) {
          return true;
        }
      });
      console.log('six: ', six);
      const nine = inputArray.find((pattern) => {
        if (
          pattern.length === 6 &&
          pattern.includes(four[0]) &&
          pattern.includes(four[1]) &&
          pattern.includes(four[2]) &&
          pattern.includes(four[3])
        ) {
          return true;
        }
      });
      console.log('nine: ', nine);
      const zero = inputArray.find((pattern) => {
        if (pattern.length === 6 && pattern !== six && pattern !== nine) {
          return true;
        }
      });
      console.log('zero: ', zero);
      const three = inputArray.find((pattern) => {
        if (
          pattern.length === 5 &&
          pattern.includes(one[0]) &&
          pattern.includes(one[1])
        ) {
          return true;
        }
      });
      console.log('three: ', three);
      const five = inputArray.find((pattern) => {
        const matchesWith6 = six.split('').filter((letter) => {
          if (pattern.includes(letter)) {
            return true;
          }
        });

        if (pattern.length === 5 && matchesWith6.length === 5) {
          return true;
        }
      });
      console.log('five: ', five);
      const two = inputArray.find((pattern) => {
        if (pattern.length === 5 && pattern !== three && pattern !== five) {
          return true;
        }
      });
      console.log('two: ', two);

      let numberString = '';
      outputArray.forEach((pattern) => {
        if (areStringEqualInChars(pattern, zero)) {
          numberString = numberString + '0';
          return;
        }
        if (areStringEqualInChars(pattern, one)) {
          numberString = numberString + '1';
          return;
        }
        if (areStringEqualInChars(pattern, two)) {
          numberString = numberString + '2';
          return;
        }
        if (areStringEqualInChars(pattern, three)) {
          numberString = numberString + '3';
          return;
        }
        if (areStringEqualInChars(pattern, four)) {
          numberString = numberString + '4';
          return;
        }
        if (areStringEqualInChars(pattern, five, true)) {
          numberString = numberString + '5';
          return;
        }
        if (areStringEqualInChars(pattern, six)) {
          numberString = numberString + '6';
          return;
        }
        if (areStringEqualInChars(pattern, seven)) {
          numberString = numberString + '7';
          return;
        }
        if (areStringEqualInChars(pattern, eight)) {
          numberString = numberString + '8';
          return;
        }
        if (areStringEqualInChars(pattern, nine)) {
          numberString = numberString + '9';
          return;
        }
      });

      total = total + parseInt(numberString);
    });
    console.log(total);
  });
