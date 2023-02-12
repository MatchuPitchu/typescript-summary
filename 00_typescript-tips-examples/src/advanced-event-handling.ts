export {};

type Handler<T> = {
  [Property in keyof T as `map${Capitalize<Property & string>}`]?: (data: T[Property]) => T[Property];
} & {
  [Property in keyof T as `filter${Capitalize<Property & string>}`]?: (data: T[Property]) => boolean;
};

type ProcessedEvent<T> = {
  eventName: keyof T;
  data: T[keyof T];
};

class EventProcessor<T extends {}> {
  private handlers: Handler<T>[] = [];
  private processed: ProcessedEvent<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;

    const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

    if (typeof eventName !== 'string') return;

    for (const handler of this.handlers) {
      const filterFunction = handler[`filter${capitalize(eventName)}` as keyof Handler<T>];

      if (typeof filterFunction === 'function' && !filterFunction(data)) {
        allowEvent = false;
        break;
      }
    }

    if (allowEvent) {
      let mappedData = { ...data };

      for (const handler of this.handlers) {
        const mapFunction = handler[`map${capitalize(eventName)}` as keyof Handler<T>];

        if (typeof mapFunction === 'function') {
          mappedData = <T[K]>mapFunction(mappedData);
        }
      }

      this.processed.push({
        eventName,
        data: mappedData,
      });
    }
  }

  // V1: Basic with addFilter and addMap
  // addFilter<K extends keyof T>(eventName: K, filter: (data: T[K]) => boolean): void {
  //   this.filters[eventName] ||= []; // '||=' if no filter function exist, than this is empty
  //   this.filters[eventName].push(filter as FilterFunction<T>);
  // }

  // addMap<K extends keyof T>(eventName: K, map: (data: T[K]) => T[K]): void {
  //   this.maps[eventName] ||= [];
  //   this.maps[eventName].push(map as unknown as MapFunction<T>);
  // }

  // V2: build generic addHandler instead of addFilter and addMap
  addHandler(handler: Handler<T>): void {
    this.handlers.push(handler);
  }

  getProcessedEvents() {
    return this.processed;
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();

uep.addHandler({
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name),
  }),
});

uep.handleEvent('login', {
  user: undefined,
  name: 'jack',
});
uep.handleEvent('login', {
  user: 'tom',
  name: 'tomas',
});
uep.handleEvent('logout', {
  user: 'tom',
});

console.log(uep.getProcessedEvents());

/*
Result:
[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } }
]
*/
