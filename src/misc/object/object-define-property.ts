/**
 * Defines a new or existing property directly on an object, and returns the object
 */
export function objectDefineProperty<GTarget, GPropertyKey extends PropertyKey, GDescriptor extends PropertyDescriptor>(
  target: GTarget,
  propertyKey: GPropertyKey,
  descriptor: GDescriptor,
): GInferObjectDefinePropertyReturn<GTarget, GPropertyKey, GDescriptor> {
  return Object.defineProperty(target, propertyKey, descriptor);
}

/* INFER */

export type IInferPropertyDescriptorGValue<GDescriptor extends PropertyDescriptor> =
  GDescriptor extends TypedPropertyDescriptor<infer GValue>
    ? GValue
    : any;

export type GInferObjectDefinePropertyReturn< // generics
  GTarget,
  GPropertyKey extends PropertyKey,
  GDescriptor extends PropertyDescriptor
  //
  > =
  GTarget
  & Record<GPropertyKey, IInferPropertyDescriptorGValue<GDescriptor>>;

