export default transducer => (
  pathObject,
  ...options
) => keyReducer =>
  transducer(
    (state, action) => pathObject[keyReducer(state, action)],
    ...options
  );
