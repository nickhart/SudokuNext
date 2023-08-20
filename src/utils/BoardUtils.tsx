export function generateAscendingArray(
  start: number,
  length: number,
  multiple: number = 1
): number[] {
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    result.push(start + i * multiple);
  }
  return result;
}

// todo: refactor this
export function rowValuesForDegree(degree: number) {
  let result = [];
  const size = degree * degree;
  for (let i = 0; i < size; i++) {
    result.push(generateAscendingArray(i * size, size));
  }
  return result;
}
