import { partition } from "./partition";

describe("partition", () => {
  it("empty array", () => {
    const [passed, failed] = partition([], (item) => !!item);

    expect(passed).toEqual([]);
    expect(failed).toEqual([]);
  });

  it("separates boolean (+converted) values", () => {
    const testArray = [1, 0, "abc", "", {}, false, true, [], null, undefined];
    const [passed, failed] = partition(testArray, (item) => !!item);

    expect(passed).toEqual([1, "abc", {}, true, []]);
    expect(failed).toEqual([0, "", false, null, undefined]);
  });
});
