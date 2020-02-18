import test from "ava";
import * as reducer from "test/macro/reducer";
import toState from "src/toState";
import action from "src/action";
import pass from "src/pass";
import compose from "src/compose";

test(`compose(action, toState(pass))`,
reducer.test,
compose(action, toState(pass)),
undefined,
{ key: "value" },
{ key: "value" }
)