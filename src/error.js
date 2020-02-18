export default (reducer = pass) => {
  return (state, action) => reducer(action.error, action);
};
