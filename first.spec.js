import {
  test,
  it,
  run,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  describe,
} from "./core.js";

beforeAll(() => {
  console.log("beforeAll");
});

beforeEach(() => {
  console.log("beforeEach");
});

afterAll(() => {
  console.log("afterAll");
});

afterEach(() => {
  console.log("afterEach");
});

test("first test case", () => {
  console.log("first test case");
  expect(2).toBe(2);
});

it("second test case", () => {
  console.log("second test case");
});

describe("sub", () => {
  test("sub:first test case", () => {
    console.log("sub:first test case");
    expect(2).toBe(2);
  });
});

run();
