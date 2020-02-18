import test from "ava";
import { todos } from "examples";
import * as reducers from "test/macro/reducer";

test(
  "todos should handle initial state",
  reducers.test,
  todos,
  undefined,
  {},
  []
);

test(
  "todos should handle ADD_TODO",
  reducers.test,
  todos,
  [],
  {
    type: "ADD_TODO",
    text: "run the tests",
    id: 0
  },
  [
    {
      text: "run the tests",
      completed: false,
      id: 0
    }
  ]
);

test(
  "todos should handle ADD_TODO",
  reducers.test,
  todos,
  [
    {
      text: "Run the tests",
      completed: false,
      id: 0
    }
  ],
  {
    type: "ADD_TODO",
    text: "Use Redux",
    id: 1
  },
  [
    {
      text: "Run the tests",
      completed: false,
      id: 0
    },
    {
      text: "Use Redux",
      completed: false,
      id: 1
    }
  ]
);

test(
  "todos should handle ADD_TODO",
  reducers.test,
  todos,
  [
    {
      text: "Run the tests",
      completed: false,
      id: 0
    },
    {
      text: "Use Redux",
      completed: false,
      id: 1
    }
  ],
  {
    type: "ADD_TODO",
    text: "Fix the tests",
    id: 2
  },
  [
    {
      text: "Run the tests",
      completed: false,
      id: 0
    },
    {
      text: "Use Redux",
      completed: false,
      id: 1
    },
    {
      text: "Fix the tests",
      completed: false,
      id: 2
    }
  ]
);

test(
  "todos should handle TOGGLE_TODO",
  reducers.test,
  todos,
  [
    {
      text: "Run the tests",
      completed: false,
      id: 1
    },
    {
      text: "Use Redux",
      completed: false,
      id: 0
    }
  ],
  {
    type: "TOGGLE_TODO",
    id: 1
  },
  [
    {
      text: "Run the tests",
      completed: true,
      id: 1
    },
    {
      text: "Use Redux",
      completed: false,
      id: 0
    }
  ]
);
