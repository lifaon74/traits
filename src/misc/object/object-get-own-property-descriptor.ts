/**
 * Returns an object describing the configuration of a specific property on a given object,
 * OR <undefined> if the object hasn't 'propertyKey' has its own properties
 */
export function objectGetOwnPropertyDescriptor<GTarget, GPropertyKey extends keyof GTarget>(
  target: GTarget,
  propertyKey: GPropertyKey,
): TypedPropertyDescriptor<GTarget[GPropertyKey]> | undefined {
  return Object.getOwnPropertyDescriptor(target, propertyKey);
}


/*----------------*/

/**
 * Like <objectGetOwnPropertyDescriptor> but throws if the object has not the property
 */
export function objectGetOwnPropertyDescriptorOrThrow<GTarget, GPropertyKey extends keyof GTarget>(
  target: GTarget,
  propertyKey: GPropertyKey,
): TypedPropertyDescriptor<GTarget[GPropertyKey]> | never {
  const descriptor: TypedPropertyDescriptor<GTarget[GPropertyKey]> | undefined = objectGetOwnPropertyDescriptor<GTarget, GPropertyKey>(target, propertyKey);
  if (descriptor === void 0) {
    throw new Error(`Property ${ String(propertyKey) } is missing`);
  } else {
    return descriptor;
  }
}



