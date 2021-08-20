var input6 = {a: 1, b: 2, ccc: "abl", "d": true};

function objectToString(obj) {
     //TODO
   for (x in obj){
       console.log(x, "->", obj[x])
   }
}

console.log(objectToString(input6)); //(a -> 1; b -> 2; ccc -> abl; d -> true)