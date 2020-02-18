import pass from "./pass";
const toState = reducer =>
  (next = pass) => (state, action) =>
    next(reducer(state, action), action);

export default toState;
