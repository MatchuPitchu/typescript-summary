"use strict";
// only defining the type with "person: object" is too less information for TS
// so I could define object in TS notation "const person: {  name: string; age: number; } = { }", 
// but best practice is to let TS define object type on his own when all types used are obvious -> const person = {...};
// without custom enum type I could define roles like this
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
// by convention, enums are writte with all-uppercase values
// now it's a enumerated list "ADMIN" = 0 ...
// starting num can be changed with ADMIN = 5 on first identifier
// can also define every num on my own or assign strings like ADMIN = "Admin" ...
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: 'Matchu',
    age: 36,
    hobbies: ['Sports', 'Cooking'],
    job: [2, 'dev'],
    role: Role.ADMIN,
};
// push method is exception, that I can add this string to a tuple type without detecting error in TS
// person.role.push('ceo');
// otherwise only the defined tuple type is allowed
person.job = [1, 'cto'];
let favoriteActivities;
favoriteActivities = ['Sports', 'Music'];
// any allows every type, but with this I give up every benefits of TS
// let mixedArr: any[];
let mixedArr;
mixedArr = ['String', 1];
console.log('Name:', person.name);
// iterate through hobbies arr in person obj
for (const hobby of person.hobbies) {
    // when type . after hobby VSC knows thanks to TS that I can apply all string methods
    console.log('Hobby:', hobby.toUpperCase());
    // console.log(hobby.map()); // !!! ERROR in TS !!! 
}
//# sourceMappingURL=c-objs-arrays-enums.js.map