var points2 = [5,6,3,2,1,8,4,6,-2,2,-55];

function getNthSmallest(arr, n) {
    
    let sortedArray = arr.sort()
    let nthSmallest = sortedArray.slice(n, n + 1)
    return nthSmallest
    
}


console.log(getNthSmallest(points2, 4)); //2g