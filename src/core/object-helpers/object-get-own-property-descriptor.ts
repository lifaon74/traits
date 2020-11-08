
/**
 * Returns an object describing the configuration of a specific property on a given object,
 * OR <undefined> if the object hasn't 'propertyKey' has its own properties
 */
export function GetOptionalOwnPropertyDescriptor<GValue = any>(
  target: any,
  propertyKey: PropertyKey,
): TypedPropertyDescriptor<GValue> | undefined {
  return Object.getOwnPropertyDescriptor(target, propertyKey);
}

/**
 * Like <GetOptionalOwnPropertyDescriptor> but throws if the object has not the property
 */
export function GetOwnPropertyDescriptor<GTarget, GPropertyKey extends keyof GTarget, GValue = any>(
  target: GTarget,
  propertyKey: GPropertyKey,
): TypedPropertyDescriptor<GValue> {
  const descriptor: PropertyDescriptor | undefined = GetOptionalOwnPropertyDescriptor<GValue>(target, propertyKey);
  if (descriptor === void 0) {
    throw new Error(`Property ${ String(propertyKey) } is missing`);
  } else {
    return descriptor as TypedPropertyDescriptor<GValue>;
  }
}


