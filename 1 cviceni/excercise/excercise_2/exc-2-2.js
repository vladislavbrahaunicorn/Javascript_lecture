
function snakeToCamel(snake) {
    //TODO
    var characters = snake.split("_")
    var finalCharacters = ""
    for(text in characters){
        let slovo = characters[text]
        let first = slovo.substring(0,1)
        first = first.toUpperCase();
        slovo = first + slovo.substring(1, slovo.length)
        finalCharacters = finalCharacters + slovo
    }
    return finalCharacters
}

console.log(snakeToCamel("some_new_word_to_transform_and_a")); //someNewWordToTransformAndA