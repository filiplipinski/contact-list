/**
 * Takes a array and returns the pair of arrays of the same type of input which do and do not satisfy the condition.
 */
export const partition = <T>(
  array: T[],
  isValid: (item: T) => boolean
): [T[], T[]] => {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[] as T[], [] as T[]]
  );
};
