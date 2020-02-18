import pass from "./pass";

const intoArray = (keyReducer, dropKey = null) => {
  if (!(keyReducer instanceof Function)) return () => (state = []) => state;
  return reducer => (state = [], action) => {
    // TODO: Warn when the state isn't an array.
    if (!Array.isArray(state)) return state;
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
      const nextState = [...state];
      nextState.splice(key, 1);
      return nextState;
    } else {
      const nextState = [...state];
      nextState[key] = nextKeyState;
      return nextState;
    }
  };
};

export default intoArray;
