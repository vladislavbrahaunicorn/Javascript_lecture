var input4 = [1, 2, 2, 4, 6, 9, 11, 12, 11, 666, 7];

function findModus (arr) {
  var numbers = [];
  for (i = 0; i < arr.length; i++) {
    if (numbers[arr[i]] === undefined || numbers[arr[i]] === null) {
      numbers[arr[i]] = 1;
    } else {
      var value = numbers[arr[i]];
      value++;
      numbers[arr[i]] = value;
    }
    console.log[numbers];
  }

  var max;
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] !== undefined) {
      if (max === undefined) {
        max = numbers[i];
      }
      if (numbers[i] > max) {
        max = numbers[i];
      }
    }
  }

  var finalArray = [];
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] === max) {
      finalArray.push (i);
    }
  }

  return finalArray;
}

console.log (findModus (input4)); //[ 2, 11 ]
