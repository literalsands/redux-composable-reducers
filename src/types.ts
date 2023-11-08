// Base
export type Action<A> = A extends Function ? never : A
export type State<S> = S extends Function ? never : S;
// export type ReturnState<R> = R extends (state: any, action: any) => infer SA ? SA : never;
export type Reducer<S, A, SA> = (
  state: S & State<_>,
  action: A & Action<_>
) => SA & State<_>
export type Transducer<R, RR> = (
  reducer: R & Reducer<_, _, _>,
) => RR & (Reducer<_, _, _> | Transducer<_, _>);

export type TransducerReducer<R, RR> = (
  ...reducer: (R & Reducer<_, _, _>)[]
) => RR & (Reducer<_, _, _> | Transducer<_, _>);

export type ReduxAction<T, P, M> = { type: T; payload: P; error?: boolean, meta?: M & object };
export type Keyed<S> = { [k: string | number]: S | Keyed<S> };
export type KeyReducer<S, A> = Reducer<Keyed<S>, A, S>;
export type KeyedReducer<S, A> = Keyed<Reducer<S, A, S>>;
export type IdentityReducer<S, A> = Reducer<S, A, S>;

export type _ = unknown;
