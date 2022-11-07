// Autobind Decorator
// instead of using _ and _2, I can also set "noUnusedParameters": false in tsconfig.json
export const Autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
  // store method that I find originally in descriptor
  const originalMethod = descriptor.value;
  // create adjusted descriptor
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    // getter method
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  // return changed descriptor which binds now always the "this" of the context where decorator is called
  return adjDescriptor;
}