import test from "ava";
import pass from "src/pass";
import branch from "src/branch";
import * as reducer from "test/macro/reducer";

test("test:branch has expected imports", t => {
  t.is(typeof pass, "function");
});

test("branch is a function", t => {
  t.is(typeof branch, "function");
});

test("branch takes a function", t => {
  t.notThrows(() => branch(() => () => {}));
});

test("branch inner function takes a function", t => {
  t.notThrows(() => branch(() => () => {})({}));
});

test("branch reduces a reducer", t => {
  t.is(branch(() => pass)("state"), pass("state"));
});

test("branch reduces a pass-like reducer when reduced branch is undefined", t => {
  const branchUndefined = branch(() => undefined);
  t.is(branchUndefined("state", "action"), pass("state", "action"));
});

test("branch reduces a value reducer when reduced branch is not a function", t => {
  const value = "green";
  const branchValue = branch(() => value);
  t.is(branchValue("state"), value);
});

test("branch reduces values from a shallow object", t => {
  const value = "green";
  const reducer = state => "reduced" + state;

  const branchObjectByState = branch({ a: undefined, b: "green", c: reducer })(pass);
  t.is(branchObjectByState("a"), "a");
  t.is(branchObjectByState("b"), value);
  t.is(branchObjectByState("c"), reducer("c"));
  t.is(branchObjectByState("d"), "d");

  const branchObjectByStateObject = branch({ a: undefined, b: "green", c: reducer })(
    ({ path }) => path
  );
  t.deepEqual(branchObjectByStateObject({ path: "a" }), { path: "a" });
  t.is(branchObjectByStateObject({ path: "b" }), value);
  t.is(branchObjectByStateObject({ path: "c" }), reducer({ path: "c" }));
  t.deepEqual(branchObjectByStateObject({ path: "d" }), { path: "d" });

  const branchObjectByAction = branch({ a: undefined, b: "green", c: reducer })(
    (state, action) => action
  );
  t.is(branchObjectByAction("state", "a"), "state");
  t.is(branchObjectByAction("state", "b"), value);
  t.is(branchObjectByAction("state", "c"), reducer("state"));
  t.is(branchObjectByAction("state", "d"), "state");
});
