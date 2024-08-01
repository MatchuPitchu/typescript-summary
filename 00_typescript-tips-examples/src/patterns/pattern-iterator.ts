// Iterator Pattern with generator function

interface Pokemon {
  name: string;
  url: string;
}

async function* iterateResults<DataType>(url: string) {
  let nextUrl: string | undefined = url;
  do {
    const response = await fetch(nextUrl);
    const json: { next?: string; results: DataType[] } = await response.json();

    // generator function yields results back to the caller (-> a for loop)
    // yield: returns array of results of one fetch (here: 20 pokemons items in 1 array)
    // yield*: returns every single result individually item AND not per block in an array of x items (here: 1281 pokemons)
    yield* json.results;

    nextUrl = json.next;
  } while (nextUrl);
}

// The for await...of statement creates a loop iterating over async iterable objects
// as well as sync iterables. This statement can only be used in contexts where await
// can be used, which includes inside an async function body and in a module.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
(async function () {
  for await (const result of iterateResults<Pokemon>('https://pokeapi.co/api/v2/pokemon')) {
    console.log(result);
    if (result.name === 'pikachu') {
      break;
    }
  }
})();
