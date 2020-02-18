export default reducer => next => (state, action) =>
  next(state, reducer(state, action));