export function convertStringToNumber(value: string): number {
  return value.length ? Number(value) : NaN;
}

export function unique(values: number[]) {
  return [...new Set(values).values()];
}
