// @ts-ignore
import colorsys from 'colorsys';
export type HsvType = { h: number; s: number; v: number };

const hsvToHex = (hsv: HsvType): string =>
  colorsys.hsvToHex(hsv.h, hsv.s, hsv.v);

export { hsvToHex };
