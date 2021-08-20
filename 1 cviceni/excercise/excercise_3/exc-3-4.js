let persons = [
    {firstName: "Jim", lastName: "Jimithy", age: 15},
    {firstName: "Peter", lastName: "Peterson", age: 25},
    {firstName: "Carl", lastName: "Carlson", age: 28},
    {firstName: "Jane", lastName: "Janison", age: 22}
];


let newPersons = []
persons.map((person, index) => {
    let fullName = person.firstName + " " + person.lastName
    let nameLength = fullName.length
    let newPerson = person
    newPerson.luckyNumber = nameLength
    newPersons.push(newPerson)
})

//TODO

console.log(persons);

//[ { firstName: 'Jim',
//     lastName: 'Jimithy',
//     age: 15,
//     luckyNumber: 11 },
//   { firstName: 'Peter',
//     lastName: 'Peterson',
//     age: 25,
//     luckyNumber: 14 },
//   { firstName: 'Carl',
//     lastName: 'Carlson',
//     age: 28,
//     luckyNumber: 12 },
//   { firstName: 'Jane',
//     lastName: 'Janison',
//     age: 22,
//     luckyNumber: 12 } ]