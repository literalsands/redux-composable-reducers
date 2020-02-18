import objectAsKeysReducer from "./objectAsKeysReducer";
import asKeyReducer from "./asKeyReducer";
import reduceKey from "./reduceKey";
import toState from "./toState";
import intoObject from "./intoObject";
import pass from "./pass";
// import DROP from "./DROP";

/**
 * 
 * @param {function|string|object} [pass] keyReducer 
 * @param {*} [null] dropKey - Returning returning this value will cause the key to be removed. 
 */
const intoObjectKey = (keyReducer = pass, dropKey = null) => {
  if (typeof keyReducer === "string")
    return asKeyReducer(intoObjectKey)(keyReducer, dropKey);
  if (typeof keyReducer === "object")
    return objectAsKeysReducer(intoObjectKey)(keyReducer, dropKey);
  if (!(keyReducer instanceof Function)) return () => pass;
  return (reducer = pass) =>
    intoObject(keyReducer, dropKey)(reduceKey(keyReducer)(reducer));
};
export default intoObjectKey;
