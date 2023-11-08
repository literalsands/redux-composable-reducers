import { Action, IdentityReducer } from "./types";
export default <S, A>(
    ...reducers: IdentityReducer<S, A>[]
  ) =>
  (state: S, action: A) =>
    reducers.reduce((state, reducer) => reducer(state, action), state);
