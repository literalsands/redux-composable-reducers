import { Transducer, Reducer, Keyed, KeyReducer, _ } from "./types";

// Takes a transducer, assumes that the Reducer is a key reducer.
const asKeyReducer =
  (transducer: Transducer<KeyReducer<_, _>, Reducer<_, _, _>>) =>
  (key: number | string): Reducer<_, _, _> => {
    const keyReducer: KeyReducer<_, _> = (state: Keyed<_>, action) => state[key];
    return transducer(keyReducer);
  };

export default asKeyReducer;
