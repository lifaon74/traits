import { objectGetPrototypesIterator } from './object-get-prototypes-iterator';
import { objectGetOwnPropertyDescriptor } from './object-get-own-property-descriptor';

export type IObjectGetPropertyDescriptorWithPrototypeIteratorType<GTarget, GPropertyKey extends keyof GTarget> = [
  descriptor: TypedPropertyDescriptor<GTarget[GPropertyKey]>,
  target: any,
];

/**
 * Returns the list of all descriptors of a object[propertyKey] (including object itself), following its prototype chain
 */
export function * objectGetPropertyDescriptorWithPrototypeIterator<GTarget, GPropertyKey extends keyof GTarget>(
  target: GTarget,
  propertyKey: GPropertyKey,
): Generator<IObjectGetPropertyDescriptorWithPrototypeIteratorType<GTarget, GPropertyKey>> {
  type GValue = GTarget[GPropertyKey];
  const prototypeIterator: Iterator<any> = objectGetPrototypesIterator(target);
  let prototypeIteratorResult: IteratorResult<any>;
  while (!(prototypeIteratorResult = prototypeIterator.next()).done) {
    const descriptor: TypedPropertyDescriptor<GValue> | undefined = objectGetOwnPropertyDescriptor<GTarget, GPropertyKey>(prototypeIteratorResult.value, propertyKey);
    if (descriptor !== void 0) {
      yield [
        descriptor,
        prototypeIteratorResult.value,
      ];
    }
  }
}
