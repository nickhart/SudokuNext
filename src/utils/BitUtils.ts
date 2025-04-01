export function bitForPosition(position: number) {
  return 1 << position;
}

export function testBit(number: number, position: number) {
  return number & bitForPosition(position);
}

export function setBit(number: number, position: number) {
  return number | bitForPosition(position);
}

export function resetBit(number: number, position: number) {
  return number & ~bitForPosition(position);
}
