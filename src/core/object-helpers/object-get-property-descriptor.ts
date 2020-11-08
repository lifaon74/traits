import {
  GetPrototypeChainPropertyDescriptor,
  GetPrototypeChainPropertyDescriptorType,
} from './object-get-prototype-chain-method';

/**
 * Returns an object describing the configuration of a specific property on a given object (follows prototype chain),
 * OR <undefined> if the object hasn't 'propertyKey' has its properties
 */

export function GetOptionalPropertyDescriptor<GValue = any>(
  target: any,
  propertyKey: PropertyKey,
): TypedPropertyDescriptor<GValue> | undefined {
  const result: IteratorResult<GetPrototypeChainPropertyDescriptorType<PropertyDescriptor, any>> = GetPrototypeChainPropertyDescriptor(target, propertyKey).next();
  return result.done
    ? void 0
    : result.value[0];
}

/**
 * Like <GetOptionalPropertyDescriptor> but throws if the object has not the property
 */
export function GetPropertyDescriptor<GTarget, GPropertyKey extends keyof GTarget, GValue = any>(
  target: GTarget,
  propertyKey: GPropertyKey,
): TypedPropertyDescriptor<GValue> {
  const descriptor: PropertyDescriptor | undefined = GetOptionalPropertyDescriptor<GValue>(target, propertyKey);
  if (descriptor === void 0) {
    throw new Error(`Property ${ String(propertyKey) } is missing`);
  } else {
    return descriptor as TypedPropertyDescriptor<GValue>;
  }
}


