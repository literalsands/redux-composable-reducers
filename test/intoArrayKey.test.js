import test from "ava";
import intoArrayKey from "src/intoArrayKey";
import intoObjectKey from "src/intoObjectKey";
import pass from "src/pass";
import action from "src/action";
import * as reducer from "test/macro/reducer";

test(
  `intoArrayKey()()`,
  reducer.test,
  intoArrayKey()(),
  undefined,
  undefined,
  []
);

test(`intoArrayKey()()`, reducer.test, intoArrayKey()(), {}, undefined, {});

test(
  `intoArrayKey(action())(() => "init")`,
  reducer.test,
  intoArrayKey(action())(() => "init"),
  [],
  0,
  ["init"]
);

test(
  `intoArrayKey()()`,
  reducer.test,
  intoArrayKey(action())(intoObjectKey(() => "status")(() => "init")),
  [],
  0,
  [{ status: "init" }]
);
