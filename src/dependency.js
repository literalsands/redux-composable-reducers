// TODO: Consider (stateReducer, ...dependantReducers)
export default dependantReducer => stateReducer => reducer => (
    state,
    action
  ) => {
    const nextState = reducer(state, action);
    const nextStateDependency = dependantReducer(nextState, action);
    const stateDependency = dependantReducer(state, action);
    if (stateDependency === nextStateDependency) {
      return nextState;
    }
    return stateReducer(nextState, action)(pass)(nextState, action);
  };
  