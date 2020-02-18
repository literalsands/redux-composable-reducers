export default (...reducers) => (state, action) =>
  reducers.reduce((state, reducer) => reducer(state, action), state);