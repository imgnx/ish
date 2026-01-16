#!/usr/bin/env ts-node

const node = process.argv.shift();
const thisFile = process.argv.shift();

function mapFn<T, U>(
  arr: T[],
  fn: (value: T, index: number, array: T[]) => U
): U[] {
  if (!Array.isArray(arr)) throw new Error('mapFn expects an array');
  const out: U[] = [];
  for (let i = 0; i < arr.length; i++) out.push(fn(arr[i], i, arr));
  return out;
}
