// Visitor Pattern
// decoupling of concerns - of traversing the API and processing the fetch results

// Explanation:
// In Functional Programming with TypeScript, the Visitor Pattern can be implemented
// using higher-order functions instead of classes or interfaces. To use the Visitor Pattern,
// you can define a set of functions that represent the data structure you want to process,
// and another set of higher-order functions that represent the operations or algorithms you
// want to perform on that data. You can define a Visitor function, which takes in a data structure
// function and returns another function that processes that data structure. This processing function
// takes in the appropriate parameters needed to perform the algorithm and returns the result of that
// algorithm. For each data structure function in your data, you define a processing function that
// accepts the Visitor function as a parameter. This processing function calls the Visitor function
// with the appropriate parameters and returns the result. This approach allows you to easily add new
// operations or algorithms to your data structure without modifying the data structure itself.
// You can simply create a new processing function that defines the new algorithm and passes it
// to the appropriate data structure function. Overall, the Visitor Pattern in functional programming
// provides a flexible and extensible way to process complex data structures in a type-safe and
// functional manner.

interface Pokemon {
  name: string;
  url: string;
}

// V1 Function approach
const visit = async <DataType>(baseUrl: string, visitor: (results: DataType[]) => void) => {
  let nextUrl: string | undefined = baseUrl;
  do {
    const response = await fetch(nextUrl);
    const json: { next?: string; results: DataType[] } = await response.json();
    visitor(json.results);
    nextUrl = json.next;
  } while (nextUrl);
};

visit<Pokemon[]>('https://pokeapi.co/api/v2/pokemon', (results) => {
  console.log(results);
});

// V2 Class approach
class VisitAllPages<DataType> {
  constructor(private baseUrl: string) {}

  async visit(visitor: (results: DataType[]) => void) {
    let nextUrl: string | undefined = this.baseUrl;
    do {
      const response = await fetch(nextUrl);
      const json: { next?: string; results: DataType[] } = await response.json();
      visitor(json.results);
      nextUrl = json.next;
    } while (nextUrl);
  }
}

const visitor = new VisitAllPages<Pokemon[]>('https://pokeapi.co/api/v2/pokemon');

visitor.visit((results) => {
  console.log(results);
});
