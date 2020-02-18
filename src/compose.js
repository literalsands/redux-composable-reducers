import pass from "./pass";

export default (...transducers) =>
  transducers
    .reverse()
    .reduce((reducer, transducer) => transducer(reducer), pass);
