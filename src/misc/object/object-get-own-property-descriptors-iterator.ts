import { objectGetOwnPropertyDescriptor } from './object-get-own-property-descriptor';
import { objectGetOwnPropertyKeys } from './object-get-own-property-key';


/**
 * Returns the list of all own descriptors of an object
 */
export function * objectGetOwnPropertyDescriptorsIterator<GTarget>(
  target: GTarget
): Generator<IObjectGetOwnPropertyDescriptorsIteratorType<GTarget>> {
  type GKeys = keyof GTarget;
  const keys: GKeys[] = objectGetOwnPropertyKeys<GTarget>(target);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key: GKeys = keys[i];
    yield [
      key,
      objectGetOwnPropertyDescriptor<GTarget, GKeys>(target, key) as PropertyDescriptor,
      target,
    ];
  }
}

export type IObjectGetOwnPropertyDescriptorsIteratorType<GTarget> = [
  propertyKey: keyof GTarget,
  descriptor: TypedPropertyDescriptor<GTarget[keyof GTarget]>,
  target: GTarget,
];
