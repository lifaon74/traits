import {
  IObjectGetPropertyDescriptorWithPrototypeIteratorType, objectGetPropertyDescriptorWithPrototypeIterator,
} from './object-get-property-descriptor-with-prototype-iterator';

/**
 * Returns an object describing the configuration of a specific property on a given object (follows prototype chain),
 * OR <undefined> if the object hasn't 'propertyKey' has its properties
 */
export function objectGetPropertyDescriptor<GTarget, GPropertyKey extends keyof GTarget>(
  target: GTarget,
  propertyKey: GPropertyKey,
): TypedPropertyDescriptor<GTarget[GPropertyKey]> | undefined {
  const result: IteratorResult<IObjectGetPropertyDescriptorWithPrototypeIteratorType<PropertyDescriptor, any>> = objectGetPropertyDescriptorWithPrototypeIterator<GTarget, GPropertyKey>(target, propertyKey).next();
  return result.done
    ? void 0
    : result.value[0];
}

export type IInferObjectGetPropertyDescriptorReturn<GTarget, GPropertyKey extends PropertyKey> =
  GPropertyKey extends keyof GTarget
    ? TypedPropertyDescriptor<GTarget[GPropertyKey]>
    : undefined;

/*----------------*/

// /**
//  * Like <GetOptionalPropertyDescriptor> but throws if the object has not the property
//  */
// export function GetPropertyDescriptor<GTarget, GPropertyKey extends keyof GTarget, GValue = any>(
//   target: GTarget,
//   propertyKey: GPropertyKey,
// ): TypedPropertyDescriptor<GValue> {
//   const descriptor: PropertyDescriptor | undefined = objectGetPropertyDescriptor<GValue>(target, propertyKey);
//   if (descriptor === void 0) {
//     throw new Error(`Property ${ String(propertyKey) } is missing`);
//   } else {
//     return descriptor as TypedPropertyDescriptor<GValue>;
//   }
// }


