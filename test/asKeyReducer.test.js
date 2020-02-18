import test from "ava";
import * as reducer from "test/macro/reducer";
import asKeyReducer from "src/asKeyReducer";
import intoObjectKey from "src/intoObjectKey";
import action from "src/action";

test(
  `asKeyReducer(intoObjectKey)("key")(action())`,
  reducer.test,
  asKeyReducer(intoObjectKey)("key")(action()),
  { key: "nextKey" },
  "nextValue",
  { key: "nextKey", nextKey: "nextValue" }
);
