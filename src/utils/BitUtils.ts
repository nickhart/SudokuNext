export function bitForPosition(position: number) {
    return 1 << (position);
}

export function testBit(number: number, position: number) {
    const result = number & bitForPosition(position);
    console.log(`testBit(${number}, ${position}) => ${result}`);
    return result;
}

export function setBit(number: number, position: number) {
    const result = number | bitForPosition(position);
    console.log(`setBit(${number}, ${position}) => ${result}`);
    return result;
}

export function resetBit(number: number, position: number) {
    return number & ~bitForPosition(position);
}
