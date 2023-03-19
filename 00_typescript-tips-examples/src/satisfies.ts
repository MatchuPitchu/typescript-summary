export type ColorType = 'rgb' | 'hex';
export type RGB = [number, number, number];
export type HEX = `#${string}`;
export type ColorObj = Record<ColorType, RGB | HEX>;

const color1: ColorObj = {
  rgb: [255, 0, 0],
  hex: '#ffffff',
};

const { rgb, hex } = color1; // both of type: RGB | `#${string}`

// typed with new satisfies operator: TypeScript 4.9
// let validate that the type of an expression matches some type, without changing the resulting type of that expression
// -> example below: all properties of color2 obj are compatible with ColorObj
const color2 = {
  rgb: [255, 0, 0],
  hex: '#ffffff',
  foo: 'bar', // TS Error: 'foo' does not exist in type 'ColorObj'
} satisfies ColorObj;

const rgb2 = color2.rgb; // [number, number, number]
const hex2 = color2.hex; // type "#ffffff"
const rgb3 = color2.rgb[3]; // TS Error: Tuple type '[number, number, number]' of length '3' has no element at index '3'.
