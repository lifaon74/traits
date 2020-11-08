import { GetOwnPropertyDescriptors } from './object-get-own-property-descriptors';
import { GetPrototypesChain } from './object-get-prototype-chain';

/**
 * Returns the list of all descriptors of an object (follows prototype chain)
 */
export function * GetPropertyDescriptors<GTarget>(
  target: GTarget,
): Generator<[propertyKey: keyof GTarget, descriptor: PropertyDescriptor, target: any], void, void> {
  const prototypeIterator: Iterator<any> = GetPrototypesChain(target);
  let prototypeIteratorResult: IteratorResult<any>;
  while (!(prototypeIteratorResult = prototypeIterator.next()).done) {
    yield * GetOwnPropertyDescriptors<GTarget>(prototypeIteratorResult.value);
  }
}
