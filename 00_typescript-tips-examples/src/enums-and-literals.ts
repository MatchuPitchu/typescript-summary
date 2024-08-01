// Enumeration
enum LoadingState {
  BEFORE_LOAD = 'beforeLoad',
  LOADING = 'loading',
  LOADED = 'loaded',
}

const germanLoadingStates = {
  [LoadingState.BEFORE_LOAD]: 'Noch nicht geladen',
  [LoadingState.LOADING]: 'Lädt',
  [LoadingState.LOADED]: 'Geladen',
};

const isLoading = (state: LoadingState) => state === LoadingState.LOADING;

console.log(isLoading(LoadingState.BEFORE_LOAD));

// Literal Types
// Numeric Literal Types: type TileSize = 8 | 16 | 32;
// String Literal Types: type Easing = "ease-in" | "ease-out" | "ease-in-out";

// würfeln
const rollDice = (dice: 1 | 2 | 3): number => {
  let total = 0;
  for (let i = 0; i < dice; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
};

console.log(rollDice(4));

// Function Overloading with String Literal in parameter 'name'
function sendEvent(name: 'addToCart', data: { productId: number }): void;
function sendEvent(name: 'checkout', data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown) {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent('addToCart', { productId: 1234 });
