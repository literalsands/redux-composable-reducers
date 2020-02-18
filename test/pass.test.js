import test from "ava";
import pass from "src/pass";
import * as reducer from "test/macro/reducer";

test(
  "pass",
  [
    reducer.test,
    reducer.isDeterministic,
    reducer.isStable,
    reducer.isActionInvariant,
    reducer.isNotStateInvariant,
  ],
  pass,
  "state",
  "action",
  "state"
);

test("pass", reducer.test, pass, undefined, "action", undefined);