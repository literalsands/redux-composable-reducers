import intoObjectKey from "../intoObjectKey";

const intoLike = transducer => reducer => {
  if (typeof reducer === "string")
    return transducer(
      (state, action) => (state instanceof Object ? state[reducer] : undefined)
    );
  if (typeof reducer === "object") return transducer(intoObjectKey(reducer));
  return transducer(reducer);
};

export default intoLike;
