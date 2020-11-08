import { GetPrototypeOf } from './object-get-prototype-of';

/**
 * Returns the list of all prototypes of an object (including object itself)
 */
export function * GetPrototypesChain(
  target: any,
): Generator<any, void, void> {
  while (target !== null) {
    yield target;
    target = GetPrototypeOf(target);
  }
}
