import { Ordering } from '../ordering-enum';

export function compareNumbers(a: number, b: number): Ordering {
  if (a < b) {
    return Ordering.Less;
  } else if (a > b) {
    return Ordering.Greater;
  } else {
    return Ordering.Equal;
  }
}


