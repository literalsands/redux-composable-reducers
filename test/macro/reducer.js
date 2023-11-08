const title = (statement, title = "", reducer, state, action, expected) =>
  `${title} ${statement} over (${JSON.stringify(state)}, ${JSON.stringify(
    action
  )})`;

const isDeterministic = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  t.deepEqual(
    reducer(state, action),
    reducer(state, action),
    "The reducer produces the same or deeply equivalent result each time it is called with the same state and action."
  );
};
isDeterministic.title = (...args) => title("is deterministic", ...args);

const isStable = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  const nextState = reducer(state, action);
  t.is(
    nextState,
    reducer(nextState, action),
    "The next state should not change over calls with the same action."
  );
};
isStable.title = (...args) => title("is stable", ...args);

const isNotStable = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  const nextState = reducer(state, action);
  t.not(
    state,
    nextState,
    "The given state and action should return a unique state."
  );
  t.not(
    nextState,
    reducer(nextState, action),
    "The next state should change over calls with the same action."
  );
};
isNotStable.title = (...args) => title("is not stable", ...args);

const test = (t, reducer, state, action, expected) => {
  t.is(typeof reducer, "function");
  t.deepEqual(expected, reducer(state, action));
};
test.title = (...args) => title(`equals ${JSON.stringify(args[4])}`, ...args);

const isNotUndefined = (t, reducer, state = undefined, action = undefined) => {
  t.is(typeof reducer, "function");
  const nextState = reducer(state, action);
  t.not(nextState, undefined, "The reducer doesn't return undefined.");
};
isNotUndefined.title = (...args) => title("isnt undefined", ...args);

const isActionInvariant = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  const nextState = reducer(state, action);
  t.deepEqual(
    nextState,
    reducer(state, undefined),
    "The reducer returns the same value when the action is undefined."
  );
};
isActionInvariant.title = (...args) => title("is action invariant", ...args);

const isNotActionInvariant = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  t.notDeepEqual(
    reducer(state, action),
    reducer(state, undefined),
    "The reducer returns the a different value when the action is undefined."
  );
};
isNotActionInvariant.title = (...args) =>
  title("is not action invariant", ...args);

const isStateInvariant = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  t.deepEqual(
    reducer(state, action),
    reducer(undefined, action),
    "The reducer returns the same value when the state is undefined."
  );
};
isStateInvariant.title = (...args) => title("is state invariant", ...args);

const isNotStateInvariant = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  t.notDeepEqual(
    reducer(state, action),
    reducer(undefined, action),
    "The reducer returns the a different value when the state is undefined."
  );
};
isNotStateInvariant.title = (...args) =>
  title("is not state invariant", ...args);

const isNormal = (t, reducer, ...actions) => {
  t.is(typeof reducer, "function");
  const nextState = actions.reduce(reducer, undefined);
  actions.forEach(action => {
    t.deepEqual(
      reducer(nextState, action),
      nextState,
      "The reducer returns the same state once an action has been applied."
    );
  });
};
isNormal.title = (title = "", reducer, ...actions) =>
  `${title} is normal over ${JSON.stringify(actions)}`;

const isNotNormal = (t, reducer, ...actions) => {
  t.is(typeof reducer, "function");
  const nextState = actions.reduce(reducer, undefined);
  t.false(
    actions.every(action => nextState === reducer(nextState, action)),
    "The reducer does not return the same state once an action has been applied for any previous action."
  )
};
isNotNormal.title = (title = "", reducer, ...actions) =>
  `${title} is not normal over ${JSON.stringify(actions)}`;


const isDeclarative = (t, reducer, state, action) => {
  t.is(typeof reducer, "function");
  const stateRef = state;
  const actionRef = action;
  const nextState = reducer(state, action);
  t.is(state, stateRef);
  t.is(action, actionRef);
  t.deepEqual(state, stateRef, "The state was not mutated.");
  t.deepEqual(action, actionRef, "The action was not mutated.");
  if (state !== nextState) {
    t.notDeepEqual(state, nextState, "The next state is different from the current state if it is a new object.");
  }
};
isDeclarative.title = (title = "", reducer, ...actions) =>
  `${title} is declarative over ${JSON.stringify(actions)}`;

export {
  test,
  isDeterministic,
  isNotUndefined,
  isStable,
  isNotStable,
  isActionInvariant,
  isNotActionInvariant,
  isStateInvariant,
  isNotStateInvariant,
  isNormal,
  isNotNormal
};
