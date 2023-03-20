"use strict";
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
person.job = [1, 'cto'];
let favoriteActivities;
favoriteActivities = ['Sports', 'Music'];
let mixedArr;
mixedArr = ['String', 1];
console.log('Name:', person.name);
for (const hobby of person.hobbies) {
    console.log('Hobby:', hobby.toUpperCase());
}
//# sourceMappingURL=03-objs-arrays-enums.js.map