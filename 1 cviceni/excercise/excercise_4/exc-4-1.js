var obj = {
  a: 2,
  b: '22',
  c: false,
  d: 'b',
  f: 3.14,
  g: 42,
};

//TODO

let count = 0;
for (key in obj) {
  // console.log(typeof obj[key] === "number")
  if (typeof obj[key] === 'number') {
    count++;
  }
}

// let count = obj.reduce((accumulator, currentValue) => {
//     if(currentValue instanceof Number){
//         if(accumulator === undefined || accumulator === null){
//             accumulator = 1;
//         }else{
//             accumulator++
//         }
//     }
// })

console.log (count); // 3
