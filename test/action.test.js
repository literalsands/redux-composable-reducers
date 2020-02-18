import test from "ava";
import action from "src/action";
import pass from "src/pass";
import * as reducer from "test/macro/reducer";

test("action is a function", t => {
  t.is(typeof action, "function");
});

test("action takes a function", t => {
  t.notThrows(() => action(() => {}));
});

test("action inner function takes a function", t => {
  t.notThrows(() => action(() => {})({}));
});

test(
  "action(pass)",
  [
    reducer.test,
    reducer.isStable,
    reducer.isDeterministic,
    reducer.isStateInvariant,
    reducer.isNotActionInvariant
  ],
  action(pass),
  "state",
  "action",
  "action"
);
