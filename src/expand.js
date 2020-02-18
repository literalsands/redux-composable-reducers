import payload from "./payload";

// Reduce an array of actions and apply.
export default (actionsReducer = payload()) => (
    reducer = pass
  ) => (state, action = {}) => {
    // Build some actions out of the action.
    const actions = actionsReducer(state, action);
    // Reduce to the next state.
    const nextState = Array.isArray(actions)
      ? actions.reduce(reducer, state)
      : reducer(state, action);
    return nextState;
  };