import test from "ava";
import intoArray from "src/intoArray";
import intoObjectKey from "src/intoObjectKey";
import pass from "src/pass";
import action from "src/action";
import * as reducer from "test/macro/reducer";

test(`intoArray()()`, reducer.test, intoArray()(), undefined, undefined, []);
test(`intoArray()()`, reducer.test, intoArray()(), {}, undefined, {});
test(`intoArray(action())(() => "init")`, reducer.test, intoArray(action())(() => "init"), [], 0, ["init"]);
test(`intoArray()()`, reducer.test, intoArray(action())(intoObjectKey(() => "status")(() => "init")), [], 0, [{ "status": "init" }]);