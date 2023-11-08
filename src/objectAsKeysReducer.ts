import reduce from "./reduce";
import { Transducer, Reducer } from "./types";

type KeyedState<S> = { [k: string | number]: S | KeyedState<S> };

type KeyTransducer<R> = Transducer<
  Reducer<unknown, unknown, string | number>,
  R
>;

// Calls a transducer with the key for every element of a keyed source.
// Calls the transducer with the value if the value is not a function.
const objectAsKeysReducer =
  <R>(transducer: KeyTransducer<R>) =>
  (object: KeyedState<R>, ...options: unknown[]) =>
    reduce(
      ...Object.entries(object).map(([key, value]) =>
        transducer(
          () => key,
          ...options
        )(
          // Recurse and let the transducer decide what to do with values when they aren't reducers.
          typeof value === "function" ? value : transducer(value)
        )
      )
    );
export default objectAsKeysReducer;
