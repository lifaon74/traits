export type TInferPropertyDescriptorType<GDescriptor extends PropertyDescriptor> =
  GDescriptor extends TypedPropertyDescriptor<infer GValue>
    ? GValue
    : never;

export type TInferObjectDefinePropertyReturn<GTarget, GPropertyKey extends PropertyKey, GDescriptor extends PropertyDescriptor> =
  GTarget
  & Record<GPropertyKey, TInferPropertyDescriptorType<GDescriptor>>;


/**
 * Defines a new or existing property directly on an object, and returns the object
 */
export function DefineProperty<GTarget, GPropertyKey extends PropertyKey, GDescriptor extends PropertyDescriptor>(
  target: GTarget,
  propertyKey: GPropertyKey,
  descriptor: GDescriptor,
): TInferObjectDefinePropertyReturn<GTarget, GPropertyKey, GDescriptor> {
  return Object.defineProperty(target, propertyKey, descriptor);
}
