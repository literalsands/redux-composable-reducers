import asKeyReducer from "./asKeyReducer";
import toState from "./toState";
import objectAsKeysReducer from "./objectAsKeysReducer";

// Set the value on a key in an object, and the reducer is passed the current object as state.
const intoObject = (keyReducer, dropKey = null) => {
    if (typeof keyReducer === "string")
      return asKeyReducer(intoObject)(keyReducer, dropKey);
    if (typeof keyReducer === "object")
      return toState(objectAsKeysReducer(intoObject)(keyReducer, dropKey));
    if (!(keyReducer instanceof Function)) return () => pass;
    return reducer => (state = {}, action) => {
      // TODO: Warn when the state isn't an object.
      if (!(state instanceof Object)) return state;
      const key = keyReducer(state, action);
      // NOTE: Ignore the [undefined] key.
      if (key === undefined) return state;
      const keyState = state[key];
      const nextKeyState = reducer(state, action);
      // No change.
      if (keyState === nextKeyState) return state;
      // The next value is the dropkey value. (default: null)
      if (nextKeyState === dropKey) {
        // There is no key to drop.
        if (keyState === undefined) return state;
        const nextState = { ...state };
        delete nextState[key];
        return nextState;
      } else {
        return { ...state, [key]: nextKeyState };
      }
    };
  };
export default intoObject;