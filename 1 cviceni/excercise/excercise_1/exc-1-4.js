input5 = [1, 4, 2, 1, 2, 2, 2, 3, 9, 8, 33];

function findUnique (arr) {
  var numbers = [];
  for (i = 0; i < arr.length; i++) {
    if (numbers[arr[i]] === undefined || numbers[arr[i]] === null) {
      numbers[arr[i]] = 1;
      //   console.log(numbers)
    } else {
      var value = numbers[arr[i]];
      value++;
      numbers[arr[i]] = value;
    }
    console.log[numbers];
  }

  var finalArray = [];
  var index;
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] === undefined) {
        if(arr[i] !== undefined){
            finalArray.push (arr[i]);
        }
     
    }
  }
  return finalArray;
}

console.log (findUnique (input5)); // [ 3, 4, 8, 9, 33 ]
