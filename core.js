// test it
// expect toBe
// test.only
// 提示是否通过/报错
// beforeAll beforeEach afterAll afterEach
// describe
// 自动执行所有的测试脚本 *.spec.js
const tests = [];
const onlys = [];
const beforeAlls = [];
const beforeEaches = [];
const afterAlls = [];
const afterEaches = [];

export function test(name, callback) {
  tests.push({ name, callback });
}

test.only = (name, callback) => {
  onlys.push({ name, callback });
};

// 优化前：
// export function it(name, callback) {
//   test(name, callback);
// }
// 优化后:
export const it = test;

export function expect(actual) {
  return {
    toBe(expected) {
      if (expected === actual) {
      } else {
        throw new Error(`fail actual:${actual} expected:${expected}`);
      }
    },
    // todo:toEqual
  };
}

export function beforeAll(callback) {
  beforeAlls.push(callback);
}

export function beforeEach(callback) {
  beforeEaches.push(callback);
}

export function afterAll(callback) {
  afterAlls.push(callback);
}

export function afterEach(callback) {
  afterEaches.push(callback);
}

export function describe(name, callback) {
  callback && callback();
}

export function run() {
  for (let beforeAllCallback of beforeAlls) {
    beforeAllCallback && beforeAllCallback();
  }
  // 优化前:
  // if (onlys.length === 0) {
  //   onlys.forEach((obj) => obj.callback && obj.callback());
  // } else {
  //   tests.forEach((obj) => obj.callback && obj.callback());
  // }
  // 优化后:
  const suit = onlys.length > 0 ? onlys : tests;

  for (let test of suit) {
    for (let beforeEachCallback of beforeEaches) {
      beforeEachCallback && beforeEachCallback();
    }
    try {
      test.callback && test.callback();
      console.log(`ok:${test.name}`);
      for (let afterEachCallback of afterEaches) {
        afterEachCallback && afterEachCallback();
      }
    } catch (error) {
      console.log(`fail:${error}`);
    }
  }
  for (let afterAllCallback of afterAlls) {
    afterAllCallback && afterAllCallback();
  }
}
