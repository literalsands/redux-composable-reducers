import intoObjectKey from "./intoObjectKey"

export default (reducer = pass) => {
  if (typeof reducer === "string") {
    // TODO: Warn when the state is not an object.
    return meta((state, action) =>
      state instanceof Object ? state[reducer] : undefined
    );
  }
  if (typeof reducer === "object") {
    return meta(intoObjectKey(reducer)(pass));
  }
  return (state, action) => reducer(action.meta, action);
};