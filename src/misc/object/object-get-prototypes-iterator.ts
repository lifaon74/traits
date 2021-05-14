import { objectGetPrototypeOf } from './object-get-prototype-of';

/**
 * Returns the list of all prototypes of an object (including object itself)
 */
export function * objectGetPrototypesIterator(
  target: any,
): Generator<any> {
  while (target !== null) {
    yield target;
    target = objectGetPrototypeOf(target);
  }
}
