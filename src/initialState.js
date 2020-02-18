const initialState = undefinedValue => {
  if (undefinedValue === undefined) {
    // TODO: Should we throw a warning or an error instead?
    return initialState(null);
  }
  return reducer => (state, action) => {
    return state === undefined
      ? reducer(undefinedValue, action)
      : reducer(state, action);
  };
};
export default initialState;

// value => reducer => reduce(filter(state => state === undefined)(always(value), reducer)
