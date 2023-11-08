import asKeyReducer from "./asKeyReducer";
import toState from "./toState";
import objectAsKeysReducer from "./objectAsKeysReducer";
import pass from "./pass";
import { Reducer, Transducer, Action, IdentityReducer } from "./types";
import { forwardHistory } from "../examples-ts";

// Keyed State where all leaf keys are reducers.
type KeyedState<S> = { [k: string | number]: S | KeyedState<S> };
type IntoTransducer<R> =
  | Transducer<string | number, R>
  | Transducer<KeyedState<R>, R>
  | Transducer<R, R>;

type KeyReducer<S, A> =
  | KeyedState<Reducer<unknown, unknown, string | number>>
  | string
  | number
  | Reducer<S & KeyedState<unknown>, A, string | number>;

// Set the value on a key in an object, and the reducer is passed the current object as state.

const intoObject = <S, A, SK, R>(
  keyReducer: KeyReducer<S, A>,
  dropKey = null
): Transducer<
  Reducer<S & KeyedState<unknown>, A, SK>,
  Reducer<S & KeyedState<unknown>, A, S & KeyedState<unknown>>
> => {
  if (typeof keyReducer === "string" || typeof keyReducer === "number")
    return asKeyReducer(intoObject)(keyReducer, dropKey);
  if (typeof keyReducer === "object")
    return toState(objectAsKeysReducer(intoObject)(keyReducer, dropKey));
  if (!(keyReducer instanceof Function)) return () => pass;
  return (
      reducer: Reducer<S & KeyedState<unknown>, A, SK>
    ): IdentityReducer<S & KeyedState<unknown>, A> =>
    (state, action) => {
      // TODO: Warn when the state isn't an object.
      if (!(state instanceof Object)) return state;
      const key = keyReducer(state, action);
      // NOTE: Ignore the [undefined] key.
      if (key === undefined) return state;
      const keyState = state[key];
      const nextKeyState = reducer(state, action);
      // No change.
      if (keyState === nextKeyState) return state;
      // The next value is the dropkey value. (default: null)
      if (nextKeyState === dropKey) {
        // There is no key to drop.
        if (keyState === undefined) return state;
        const nextState = { ...state };
        delete nextState[key];
        return nextState;
      } else {
        return { ...state, [key]: nextKeyState };
      }
    };
};
export default intoObject;
