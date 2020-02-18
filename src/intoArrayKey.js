import asKeyReducer from "./asKeyReducer";
import intoArray from "./intoArray";
import reduceKey from "./reduceKey";
import pass from "./pass";

const intoArrayKey = (keyReducer, dropKey = null) => {
  if (typeof keyReducer === "number")
    return asKeyReducer(intoArrayKey)(keyReducer);
  if (typeof keyReducer === "string")
    return asKeyReducer(intoArrayKey)(keyReducer);
  if (!(keyReducer instanceof Function)) return () => (state = []) => state;
  return (reducer = pass) =>
    intoArray(keyReducer, dropKey)(reduceKey(keyReducer)(reducer));
};
export default intoArrayKey;
