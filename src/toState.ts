import pass from "./pass";
import { Reducer } from "./types";

// Passes the reduced state to the next reducer when given a state.
// Works as reduce when composed.
const toState = <S, A, SA> (reducer: Reducer<S, A, SA>) =>
  (next = pass): Reducer<SA, A, SA> => (state, action) =>
    next(reducer(state, action), action);

export default toState;
