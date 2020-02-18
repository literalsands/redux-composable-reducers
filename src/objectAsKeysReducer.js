import reduce from "./reduce";

const objectAsKeysReducer = transducer => (object, ...options) =>
  reduce(
    ...Object.entries(object).map(([key, value]) =>
      transducer(
        () => key,
        ...options
      )
      // Recurse and let the transducer decide what to do with values when they aren't reducers.
      (typeof value === "function" ? value : transducer(value))
    )
  );
export default objectAsKeysReducer;