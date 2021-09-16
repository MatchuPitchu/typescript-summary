let person3 = { name: 'Matchu' }
let newPerson = person3
newPerson.name = 'Pitchu'
// This prints 'Pitchu' because I never copied person obj itself to newPerson
// only copied the pointer; it points still at the same address in memory
// real copy would be e.g. let newPerson = {...person};
console.log(person3.name)