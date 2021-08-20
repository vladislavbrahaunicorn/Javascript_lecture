
var csvInput = "1,  Peter,  22;" +
    "2, Jim, 11,;" +
    "3, P eeter, 8 ;";

function tranformCsv(string) {
    var pole = string.split(";")
    let osoby = []
    for(person in pole){
        let polozky = pole[person].split(",")
        let osoba = {
            id: polozky[0],
            name: polozky[1],
            age: polozky[2]
        }
        osoby.push(osoba)
    }
    return osoby

}

console.log(tranformCsv(csvInput));
// [ { id: 1, name: 'Peter', age: 22 },
//    { id: 2, name: 'Jim', age: 11 },
//    { id: 3, name: 'P eeter', age: 8 } ]
