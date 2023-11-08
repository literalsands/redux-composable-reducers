import test from "ava";
import payload from "src/payload";
import pass from "src/pass";
import action from "src/action";
import intoObjectKey from "src/intoObjectKey";
import * as reducer from "test/macro/reducer";

test(
  `intoObjectKey(payload("type"))(pass)`,
  [
    reducer.isDeterministic,
    reducer.isStable,
    reducer.test,
    reducer.isNotUndefined
  ],
  intoObjectKey(payload("key"))(payload("value")),
  undefined,
  { payload: { key: "foo", value: "bar" } },
  { foo: "bar" }
);

test(
  `intoObjectKey({ value: payload("myvalue"), key: payload("mykey"), pass: payload() })`,
  [
    reducer.isDeterministic,
    reducer.isStable,
    reducer.test,
    reducer.isNotUndefined
  ],
  intoObjectKey({
    myvalue: payload("value"),
    mykey: payload("key"),
    pass: payload()
  }),
  undefined,
  { payload: { key: "foo", value: "bar" } },
  { myvalue: "bar", mykey: "foo", pass: { key: "foo", value: "bar" } }
);

test(
  `intoObjectKey({ deep: { myvalue: payload("value"), mykey: payload("key"), }, pass: payload() })`,
  [
    reducer.isDeterministic,
    reducer.isStable,
    reducer.test,
    reducer.isNotUndefined
  ],
  intoObjectKey({
    deep: {
      myvalue: payload("value"),
      mykey: payload("key")
    },
    pass: payload()
  }),
  undefined,
  { payload: { key: "foo", value: "bar" } },
  { deep: { myvalue: "bar", mykey: "foo" }, pass: { key: "foo", value: "bar" } }
);

test(
  `intoObjectKey(pass)(pass)`,
  reducer.test,
  intoObjectKey(pass)(pass),
  "notanobject",
  "value",
  "notanobject"
);

test(
  `intoObjectKey(() => "key")(action())`,
  reducer.test,
  intoObjectKey(() => "key")(action()),
  undefined,
  "value",
  { key: "value" }
);

test(
  `intoObjectKey(() => "key")(action())`,
  reducer.test,
  intoObjectKey(() => "key")(action()),
  { key: "empty" },
  "value",
  { key: "value" }
);
