import pass from "./pass";
import asKeyReducer from "./asKeyReducer";
import { State, Action, Reducer, _ } from "./types";

const action = (
  reducer: Function | string = pass
)  => {
  if (typeof reducer === "string") return asKeyReducer(action)(reducer);
  return (state, action) => reducer(action, action);
};

export default action;
