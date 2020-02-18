import toAction from "./toAction";

export const defaultMerge = (state, nextState) => {
  if (state === undefined) return nextState;
  if (nextState === undefined) return state;
  if (Array.isArray(state) && Array.isArray(nextState)) return nextState;
  if (typeof state === "object" && typeof nextState === "object") {
    //   return defaultMerge(branch(state))
  }
  return nextState;
};

export default (merger = defaultMerge) => reducer => toAction(reducer)(merger)
