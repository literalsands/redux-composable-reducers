import test from "ava";
import * as reducer from "test/macro/reducer";
import pass from "src/pass";
import payload from "src/payload";

test(
  "payload(pass)",
  [
    reducer.test,
    reducer.isDeterministic,
    reducer.isStable,
    reducer.isStateInvariant,
    reducer.isNotActionInvariant
  ],
  payload(pass),
  undefined,
  { payload: {} },
  {}
);

test(
  `payload("key")`,
  [
    reducer.test,
    reducer.isDeterministic,
    reducer.isStable,
    reducer.isStateInvariant,
    reducer.isNotActionInvariant
  ],
  payload("key"),
  undefined,
  { payload: { key: "value" } },
  "value"
);
