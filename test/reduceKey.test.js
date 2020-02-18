import test from "ava";
import reduceKey from "src/reduceKey";
import * as reducer from "test/macro/reducer";

test(`reduceKey()()`, reducer.test, reduceKey()(), undefined, undefined, undefined);

test(`reduceKey(() => 'key')()`, reducer.test, reduceKey(() => 'key')(), { key: 'value' }, undefined, 'value');
