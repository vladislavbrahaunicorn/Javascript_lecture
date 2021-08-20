
function camelToSnake(camel) {
    //TODO
    let finalCharacters = ""
    for( i=0; i< camel.length; i++ ){
        if (isUpperCase(camel.charAt(i))){
            finalCharacters = finalCharacters + "_" + camel.charAt(i).toLowerCase()
        
        }else{
            finalCharacters = finalCharacters + camel.charAt(i)
        }
    
    }
    return finalCharacters
}

function isUpperCase(char){
    return char === char.toUpperCase()
}

console.log(camelToSnake("someNewWordToTransformAndA")); //some_new_word_to_transform_and_a
