export type Action<A> = A extends Function ? never : A;
export type State<S> = S extends Function ? never : S;
// export type ReturnState<R> = R extends (state: any, action: any) => infer SA ? SA : never;
export type Reducer<S, A> = AsymReducer<S, A, S>;

export type AsymReducer<S, A, SA> = (
  state: S & State<any>,
  action: A & Action<any>
) => SA & State<any>;

export type ActionFromReducer<R> = R extends Reducer<any, infer A> ? A : never;

export type StateFromReducer<R> = R extends Reducer<infer S, any> ? S : never;

export type ReducersMapObject<S, A> = {
  [K in keyof S]: Reducer<S[K], A>;
};

export type StateFromReducersMapObject<M> = M[keyof M] extends
  | Reducer<any, any>
  | undefined
  ? {
      [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never;
    }
  : never;

export type ActionFromReducersMapObject<M> = M[keyof M] extends
  | Reducer<any, any>
  | undefined
  ? {
      [P in keyof M]: M[P] extends Reducer<any, infer A> ? A : never;
    }
  : never;

export type Transducer<R, RR> = (
  reducer: R & Reducer<any, any>
) => RR & (Reducer<any, any> | Transducer<any, any>);

export type TransducerReducer<R, RR> = (
  ...reducer: (R & Reducer<any, any>)[]
) => RR & (Reducer<any, any> | Transducer<any, any>);

export type ReduxAction<T, P, M> = {
  type: T;
  payload: P;
  error?: boolean;
  meta?: M & object;
};
export type Keyed<S> = { [k: string | number]: S | Keyed<S> };
export type KeyReducer<S, A> = Reducer<Keyed<S>, A>;
export type KeyedReducer<S, A> = Keyed<Reducer<S, A>>;

type IntoReducer =
  | ((
      getKey: undefined | string | number | ((...a: any[]) => string | number)
    ) => (setValue: Reducer<any, any>) => Reducer<Keyed<any>, any>)
  | ((
      getKey: Keyed<undefined | string | number | Reducer<any, any>>
    ) => Reducer<Keyed<any>, any>);

export const pass = (state: any, action?: any) => state;
export const action = (
  getKey: undefined | string | ((...a: any[]) => string)
): Reducer<any, Keyed<any>> => {
  if (getKey === undefined) return (state, action) => action;
  if (typeof getKey === "string") return (state, action) => action[getKey];
  return (state, action) => action[getKey(state, action)];
};

export const payload = () => action("payload");
export const error = () => action("error");
export const meta = () => action("meta");
export const type = () => action("type");

export const state = (
  getKey: undefined | string | ((...a: any[]) => string)
): Reducer<any, Keyed<any>> => {
  if (getKey === undefined) return pass;
  if (typeof getKey === "string") return (state, action) => state[getKey];
  return (state, action) => state[getKey(state, action)];
};

export const key = state;

export const objectAsKeysReducer =
  (intoReducer: IntoReducer): IntoReducer =>
  (getKeyOrReducerMap) => {
    if (!(getKeyOrReducerMap instanceof Object))
      return intoReducer(getKeyOrReducerMap);
    const mappedReducers: Array<Reducer<Keyed<any>, any>> = Object.entries(getKeyOrReducerMap).map(
      ([key, value]) =>
        intoReducer(() => key)(
          typeof value === "function" // Reducer
            ? value
            : value instanceof Object // Nested Reducer Maps
            ? objectAsKeysReducer(intoReducer)(value)
            : () => value // Anything else...
        )
    );
    return (state: Keyed<any>, action: any) =>
      mappedReducers.reduce((s, t) => t(s, action), state);
  };

export const intoObject: IntoReducer = (getKey) => {
  if (getKey === undefined) return state;
  if (typeof getKey === "string" || typeof getKey === "number")
    return intoObject(() => getKey);
  if (getKey instanceof Function)
    return (setValue) => (state, action) => {
      // TODO: Warn when the state isn't an object.
      if (!(state instanceof Object)) return state;
      const key = getKey(state, action);
      // NOTE: Ignore the [undefined] key.
      if (key === undefined) return state;
      const keyState = state[key];
      const nextKeyState = setValue(state, action);
      // No change.
      if (keyState === nextKeyState) return state;
      // The next value is the dropkey value. (default: null)
      if (nextKeyState === null) {
        // There is no key to drop.
        if (keyState === undefined) return state;
        const nextState = { ...state };
        delete nextState[key];
        return nextState;
      } else {
        return { ...state, [key]: nextKeyState };
      }
    };
  if (getKey instanceof Object) return objectAsKeysReducer(intoObject)(getKey);
  return () => pass;
};

// objectAsKeysReducer(intoObject)({ grapes: "grow", grow: () => "heya" })({}, {});

state(pass("b"))({ c: "adsf" }, undefined);
