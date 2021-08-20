var changes = "+++-+---++--+-+-++";

function countOfChages(str) {
    let lastVal = str.charAt(0)
    let changes = 0
    for( i=0; i< str.length; i++ ){
        if(str.charAt(i) !== lastVal){
            lastVal = str.charAt(i)
            changes++
        }
    }
    return changes
}

console.log(countOfChages(changes)); //10