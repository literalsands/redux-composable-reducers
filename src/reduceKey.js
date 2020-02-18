import pass from "./pass";
import asKeyReducer from "./asKeyReducer";

const reduceKey = keyReducer => {
  if (typeof keyReducer === "string")
    return asKeyReducer(reduceKey)(keyReducer);
  if (!(keyReducer instanceof Function)) return () => () => undefined;
  return (reducer = pass) => (state, action) => {
    // TODO: Warn when the state isn't an object.
    if (!(state instanceof Object)) return undefined;
    const key = keyReducer(state, action);
    // NOTE: Ignore the [undefined] key.
    if (key === undefined) return state;
    const keyState = state[key];
    return reducer(keyState, action);
  };
};

export default reduceKey;

