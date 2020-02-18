import asKeyReducer from "./asKeyReducer";
import intoObjectKey from "./intoObjectKey";
import pass from "./pass";

// const payload = intoLike(toState(action("payload")));
const payload = (reducer = pass) => {
  if (typeof reducer === "string") {
    return asKeyReducer(payload)(reducer);
  }
  if (typeof reducer === "object") {
    return payload(intoObjectKey(reducer)(pass));
  }
  return (state, action) => reducer(action instanceof Object ? action.payload : undefined, action);
};
export default payload;
