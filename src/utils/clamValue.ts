const clamValue = (value: number, min: number = 0, max: number = 100): number =>
  Math.min(max, Math.max(min, value));

export default clamValue;
