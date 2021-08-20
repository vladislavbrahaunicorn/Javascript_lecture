let persons = [
    {firstName: "Jim", lastName: "Jimithy", age: 15},
    {firstName: "Peter", lastName: "Peterson", age: 25},
    {firstName: "Carl", lastName: "Carlson", age: 28},
    {firstName: "Jane", lastName: "Janison", age: 22}
];

//TODO

// var oldest = -1
// persons.forEach((person, index, allPersons) => {
//     if(person.age > oldest){
//         oldest = person.age
//     }
// })



let oldest = -1
persons.reduce((accumulatedValue, currentValue) => {
    if(currentValue.age > oldest){
        oldest = currentValue.age
        accumulatedValue = currentValue.age
    }
})

let oldestPerson = persons.find((person, index) => {
    return person.age == oldest
})

console.log(oldestPerson); // { firstName: 'Carl', lastName: 'Carlson', age: 28 }