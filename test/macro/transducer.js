const title = (statement, title = "", transducer, reducer) =>
  `${title} ${statement}`;

const accept = (t, transducer, reducer) => {
  t.is(typeof transducer, "function");
  t.notThrows(
    () => transducer(reducer),
  );
  const nextReducer = transducer(reducer);
  t.is(typeof nextReducer, "function");
};
accept.title = (...args) =>
  title(`takes a reducer ${args[3].name}`, ...args);

const isComposable = (t, transducer, reducer = state => state) => {
  const compose = (...transducers) => reducer =>
    transducers.reduce((reducer, transducer) => transducer(reducer), reducer);
  t.notThrows(
    () =>
      compose(
        reducer => (state, action) => reducer(state, action),
        transducer,
        reducer => (state, action) => reducer(state, action)
      )(reducer)(undefined, undefined),
    "The transducer is composable."
  );
};
isComposable.title = (...args) => title(`is composable`, ...args);

const error = (t, transducer, reducer, expected) => {
  t.is(typeof transducer, "function");
  t.throws(
    () => transducer(reducer),
    expected,
    "The transducer should throw an error."
  );
};
error.title = (...args) => title(`throws ${JSON.stringify(args[3])}`, ...args);

export { isComposable, error, accept };
