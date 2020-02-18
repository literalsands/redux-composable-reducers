export default transducer => (keyReducer, ...options) =>
  transducer((state = {}) => state[keyReducer], ...options);
