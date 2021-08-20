
function isPalindrom(word) {
    let reverse = reverseString(word)
    return reverse === word
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log(isPalindrom("ohoho")); //true
