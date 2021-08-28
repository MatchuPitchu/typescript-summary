// Classes

abstract class Department {
  // 1) to define here an id, name etc of a key is only support in very modern JS (look at TS to JS compilation file)
  // this is not a key value pair
  // this just defines a key and his value type that I want to creat with this class
  // private readonly id: string;
  // private name: string;

  // 6) Only available TypeScript: "private", "protected" and "public" (is the default) Access Modifiers: can mark properties and methods with these key words
  // "private": means that is only accessible from inside the class / from inside the created object
  // "protected": means like "private" + also in any class that "extends" this class
  // "public": I can access it from outside and manipulate it (like accounting.employees[2] = 'Anna')
  protected employees: string[] = [];

  // 2) constructor is a reserved key word in classes, it is a function tied to the class
  // this function is executed when object is created
  // 7) Shorthand Initialization: in order to not repeat, don't need "name: string" and "id: string" above
  // and "this.name = name" and "this.id = id" in constructor, only need private or public and wished 
  // variable names as parameters in constructor function
  // 8) "readonly" properties: only exists in TS; not allowed to change after initialization
  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
  }

  // 12) Static Properties & Methods with "static" keyword: allow you to add properties & methods to classes which are not accessed on an 
  // instance of the class, so I don't need to call first new ClassName and save this in a constant; I access static methods & properties 
  // directly on the class; Example: Math constructor function or globally available function
  // Attention: Cannot accessing static properties & methods inside the class with for example "this.fiscalYear", 
  // because they're detachted from instances; if I want access inside class then have to write Department.fiscalYear
  static fiscalYear = 2021;

  static createEmployee(name: string) {
    return { name: name };
  }

  // 3) Add method to class
  // in TS I can add the "this" parameter here; it is a special instruction understood by TS,
  // not a real parameter, more like a dummy parameter; it is a hint where this.name should refer to
  // describe(this: Department) {
    // use "this" keyword to refer to the property of this class 
    // console.log(`Department {${this.id}: ${this.name}}`);    
  // }

  // 13) Abstract Classes: usefull if I want to enforce that all classes based on one class share some common methods and properties;
  // Good to know: with "abstract" now I cannot instantiate this base class;
  // Use keyword "abstract" in front of function AND of class name (look above);
  // Force(!) all classes based on that class to add and overwrite this describe method;
  // Here I define the structure of the method with the return type
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 4) create a new obj based on the Department Class (I instantiate the class)
// const accounting = new Department('d1', 'Accounting');

// 9) Inheritance: inherit Department Class to another subtype Class using "extends" keyword;
// every property, method and the constructor is inherited from base class
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    // calls constructor of base class
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id)
  }
}

// using a static method & properties of Department class
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear)

const it = new ITDepartment('d1', ['Felix']);
it.describe();
it.addEmployee('Felix');
it.addEmployee('Mio');
it.addEmployee('Avi');
it.printEmployeeInformation();
console.log(it)

// 14) Singletons & Private Constructors: to make sure that I can only create one obj based on this class
// (for example because I know that only one Accounting Department exists in my company);
// use "private" keyword in front of constructor, that I cannot access constructor from outside (so new ClassName NOT possible);
// create a "private static" property of type ClassName (-> here AccountingDepartment) where I can store one obj/one instance;
// create static method with if check: Either I return the one instance that already exists or I create a new one
// use for example "const accounting = AccountingDepartment.getInstance()" to invoke static method

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  // 11) Getters & Setters
  get mostRecentReport() {
    if ( this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.')
  }

  set mostRecentReport(value: string) {
    if(!value) {
      throw new Error('Please pass in a valid value.')
    }
    this.addReport(value);
  }

  // Initialise variable reports with shorthand (siehe oben)
  private constructor(id: string, private reports: string[]) {
    // calls constructor of base class
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  // 10) Overriding Properties and Methods of base class
  addEmployee(name: string) {
    if(name === 'Matchu') return;
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports() {
    console.log(this.reports)
  }
}

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();

accounting.describe();
// Using setter with equal sign, so access it like a property
accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Report Title');
// Call getter like a property, not like a function with parantheses
console.log(accounting.mostRecentReport);
accounting.getReports();
accounting.addEmployee('Matchu'); // Does not work because of class method
accounting.addEmployee('Pitchu');
console.log(accounting);

// 5) When I create a new obj with describe method based on accounting obj, than all properties and methods of
// the base class are needed, otherwise TS would complain
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();