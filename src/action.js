import pass from "./pass";
import asKeyReducer from "./asKeyReducer";

const action = (reducer = pass) => {
  if (typeof reducer === "string") return asKeyReducer(action)(reducer);
  return (state, action) => reducer(action, action);
};

export default action;
