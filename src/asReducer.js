import pass from "./pass";

export default value => {
  if (value === undefined) return pass;
  if (value instanceof Function) return value;
  return () => value;
};
