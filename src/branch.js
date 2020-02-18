import objectAsReducerPath from "./objectAsReducerPath";
import asReducer from "./asReducer";

const branch = reducerReducer => {
  if (typeof reducerReducer === "object") {
    return objectAsReducerPath(branch)(reducerReducer);
  }
  return (state, action) =>
    asReducer(reducerReducer(state, action))(state, action);
};

export default branch;