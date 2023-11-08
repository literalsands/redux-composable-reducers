import { Reducer, Transducer, _ } from "./types";

type DefinedState<T> = T extends undefined ? never : T;

// Sets the initial state to a specific value when the state is undefined.
const initialState = (
  stateWhenUndefined: DefinedState<_>
): Transducer<Reducer<_, _, _>, Reducer<_, _, _>> => {
  return (reducer) => (state, action) => {
    return state === undefined
      ? reducer(stateWhenUndefined, action)
      : reducer(state, action);
  };
};

export default initialState;
