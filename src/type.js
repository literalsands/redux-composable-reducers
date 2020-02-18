import branch from "./branch";
import pass from "./pass";

const type = (reducer = pass) => {
  if (typeof reducer === "string") {
    return type(state => state === reducer);
  }
  if (Array.isArray(reducer)) {
    // TODO: Consider using maps or keying the arrays for efficiency.
    return type(state => reducer.includes(state));
  }
  if (typeof reducer === "object") {
    return branch(reducer)(type());
  }
  return (state, action) => reducer(action instanceof Object ? action.type : undefined, action);
};
export default type;
