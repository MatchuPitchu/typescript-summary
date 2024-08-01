const createLoggerFunction = () => {
  return (str: string) => console.log(str);
};

const logger1 = createLoggerFunction();
logger1('foo');

const createLoggerClass = () => {
  return class MyLoggerClass {
    private completeLog: string = '';

    log(str: string) {
      console.log(str);
      this.completeLog += `${str} \n`;
    }

    dumpLog() {
      return this.completeLog;
    }
  };
};

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();

logger2.log('Foo');
console.log(logger2.dumpLog());

const CreateSimpleMemoryDatabase = <T>() => {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }
    get(id: string): T {
      return this.db[id];
    }
    getObject(): object {
      return this.db;
    }
  };
};

type User = {
  name: string;
  city: string;
};

const UserDatabase = CreateSimpleMemoryDatabase<User>();

const userDb1 = new UserDatabase();
// userDb1.set('1', 123); // Type Error
userDb1.set('1', { name: 'Matchu', city: 'Berlin' });

// Mixin
type Constructor<T> = new (...args: any[]) => T; // constructor functions can be identified with new keyword

// Notice: The object type represents all non-primitive values while the Object type describes the functionality of all objects.
// For example, the Object type has the toString() and valueOf() methods that can be accessible by any object.
type MandatoryMethods = { getObject(): object };

const Dumpable = <T extends Constructor<MandatoryMethods>>(Base: T) => {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
};

const DumpableStringDatabase = Dumpable(UserDatabase);

const userDb2 = new DumpableStringDatabase();
// userDb2.set('1', 123); // Type Error
userDb2.set('1', { name: 'Matchu', city: 'Berlin' });
userDb2.dump(); // { 1: { name: 'Matchu', city: 'Berlin' }
