import test from "ava";
import type from "src/type";
import * as reducer from "test/macro/reducer";

test(`type()`, reducer.test, type(), undefined, undefined, undefined);
test(`type()`, reducer.test, type(), undefined, {}, undefined);
test(`type()`, reducer.test, type(), undefined, { type: "TYPE" }, "TYPE");
test(
  `type("TYPE")`,
  reducer.test,
  type("TYPE"),
  undefined,
  { type: "TYPE" },
  true
);
test(
  `type("TYPE")`,
  reducer.test,
  type("TYPE"),
  undefined,
  { type: "NOTTYPE" },
  false
);
test(
  `type(["A", "B"])`,
  reducer.test,
  type(["A", "B"]),
  undefined,
  { type: "0" },
  false
);
test(
  `type(["A", "B"])`,
  reducer.test,
  type(["A", "B"]),
  undefined,
  { type: "A" },
  true
);
test(
  `type(["A", "B"])`,
  reducer.test,
  type(["A", "B"]),
  undefined,
  { type: "B" },
  true
);

const setResetReducer = type({
  SET: (state, action) => action.value,
  RESET: () => undefined
});
test(
  `type({
    SET: (state, action) => action.value,
    RESET: () => undefined
  })`,
  reducer.test,
  setResetReducer,
  undefined,
  { type: "SET", value: "GREEN" },
  "GREEN"
);
test(
  `type({
    SET: (state, action) => action.value,
    RESET: () => undefined
  })`,
  reducer.test,
  setResetReducer,
  undefined,
  { type: "RESET" },
  undefined
);
test(
  `type({
    SET: (state, action) => action.value,
    RESET: () => undefined
  })`,
  reducer.test,
  setResetReducer,
  "STATE",
  { type: "NOTTYPE" },
  "STATE"
);
