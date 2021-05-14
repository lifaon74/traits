import { objectGetOwnPropertyDescriptorsIterator } from './object-get-own-property-descriptors-iterator';
import { objectGetPrototypesIterator } from './object-get-prototypes-iterator';

export type IObjectGetPropertyDescriptorsIteratorType<GTarget> = [
  propertyKey: keyof GTarget,
  descriptor: TypedPropertyDescriptor<GTarget[keyof GTarget]>,
  target: any,
];

/**
 * Returns the list of all descriptors of an object (follows prototype chain)
 */
export function * objectGetPropertyDescriptorsIterator<GTarget>(
  target: GTarget,
): Generator<IObjectGetPropertyDescriptorsIteratorType<GTarget>> {
  const prototypeIterator: Iterator<any> = objectGetPrototypesIterator(target);
  let prototypeIteratorResult: IteratorResult<any>;
  while (!(prototypeIteratorResult = prototypeIterator.next()).done) {
    yield * objectGetOwnPropertyDescriptorsIterator<GTarget>(prototypeIteratorResult.value);
  }
}
