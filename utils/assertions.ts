
import { expect } from '@playwright/test';

export function verifySortedAscending(arr: number[]) {
  const sorted = [...arr].sort((a,b)=>a-b);
  expect(arr).toEqual(sorted);
}
