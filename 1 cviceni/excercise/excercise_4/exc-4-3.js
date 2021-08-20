var anotherObj = {
  a: 1,
  _b: 2,
  _c: 4,
  _d: () => {},
  e: () => {},
};

//TODO

let newObj = {};
for (key in anotherObj) {
  if (key.slice (0, 1) !== '_') {
    newObj.key = anotherObj[key];
  }
}

anotherObj = newObj

console.log (anotherObj); //{ a: 1, e: [Function: e] }
