import { GetPrototypesChain } from './object-get-prototype-chain';
import { GetOptionalOwnPropertyDescriptor } from './object-get-own-property-descriptor';

export type GetPrototypeChainPropertyDescriptorType<GTarget, GPropertyKey extends keyof GTarget> = [descriptor: TypedPropertyDescriptor<GTarget[GPropertyKey]>, target: any];
/**
 * Returns the list of all descriptors of a object[propertyKey] (including object itself), following its prototype chain
 */
export function * GetPrototypeChainPropertyDescriptor<GTarget, GPropertyKey extends keyof GTarget>(
  target: GTarget,
  propertyKey: GPropertyKey,
): Generator<GetPrototypeChainPropertyDescriptorType<GTarget, GPropertyKey>, void, void> {
  type TValue = GTarget[GPropertyKey];
  const prototypeIterator: Iterator<any> = GetPrototypesChain(target);
  let prototypeIteratorResult: IteratorResult<any>;
  while (!(prototypeIteratorResult = prototypeIterator.next()).done) {
    const descriptor: TypedPropertyDescriptor<TValue> | undefined = GetOptionalOwnPropertyDescriptor<TValue>(prototypeIteratorResult.value, propertyKey);
    if (descriptor !== void 0) {
      yield [descriptor, prototypeIteratorResult.value];
    }
  }
}
