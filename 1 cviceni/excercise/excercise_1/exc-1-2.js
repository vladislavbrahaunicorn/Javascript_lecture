var input2 = [1, 2, 4, 6, 9, 11, 11, 12];
var input3 = [1, 2, 4, 6, 9, 11, 11, 12, 13];

function findMedian(arr) {
    var pocet = arr.length
    var index
    // console.log( (pocet+1) / 2)
    if(pocet % 2 === 0){
        index = (pocet)/2
        index--
        return arr[index]
    }else{
        index = ((pocet+1) / 2)
        index--
        var n =  arr[index]

        index = ((pocet-1) / 2)
         index--
         var m =  arr[index]
         return ((n+ m)/2)
       
    }
      
    
    
}

console.log(findMedian(input2)); // 7.5
console.log(findMedian(input3)); // 9

