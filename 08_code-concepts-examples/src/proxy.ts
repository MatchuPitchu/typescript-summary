// YouTube Video: Actual use case for JavaScript PROXY!
// https://www.youtube.com/watch?v=9jl1lhFylJs&list=LL

// Challenge: Anstelle von `big` soll `large` durch User von `cities` obj genutzt werden. `big` soll mit einer Warnung deprecated werden.
// Hinweis: Dieses Anwendungsbeispiel würde mit Typescript nie vorkommen.
// Ich muss `cities` als `Record<string, string>` typen, damit es funktioniert.

type ReplacementObject = {
  replacementName: string;
};

const legacyCities: Record<string, ReplacementObject> = {
  big: {
    replacementName: 'large',
  },
};

const cities: Record<string, string[]> = {
  small: ['Gera', 'Jena'],
  large: ['Berlin', 'München'],
};

const proxyHandler: ProxyHandler<typeof cities> = {
  get: (target, property, receiver) => {
    if (typeof property === 'string' && property in legacyCities) {
      const propReplacementName = legacyCities[property]?.replacementName;
      if (!propReplacementName) return Reflect.get(target, property, receiver);

      console.warn(`The property '${property}' is deprecated.`, `Use '${propReplacementName}' instead`);
      return target[propReplacementName];
    }

    return Reflect.get(target, property, receiver);
  },
};

const proxiedCities = new Proxy(cities, proxyHandler);
console.log('Output big:', proxiedCities.big);
console.log('Output large:', proxiedCities.large);
