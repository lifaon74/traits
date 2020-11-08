import { GetOptionalOwnPropertyDescriptor } from './object-get-own-property-descriptor';
import { GetOwnPropertyKeys } from './object-get-own-property-key';

export type TGetOwnPropertyDescriptorsIteratorType<GTarget> = [propertyKey: keyof GTarget, descriptor: PropertyDescriptor, target: GTarget];

/**
 * Returns the list of all own descriptors of an object
 */
export function * GetOwnPropertyDescriptors<GTarget>(
  target: GTarget
): Generator<TGetOwnPropertyDescriptorsIteratorType<GTarget>, void, void> {
  const keys: (keyof GTarget)[] = GetOwnPropertyKeys<GTarget>(target);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key: (keyof GTarget) = keys[i];
    yield [key, GetOptionalOwnPropertyDescriptor(target, key) as PropertyDescriptor, target];
  }
}
