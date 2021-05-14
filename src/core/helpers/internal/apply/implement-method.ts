import { objectDefineProperty, objectHasProperty } from '../../../../misc';
import { IMethod } from '../types/method.type';

/**
 * Implements a method on target.
 *  - skips implementation if method has already been implemented from 'implementedProperties'
 *  - else, throws if method is already implemented on 'target'
 */
export function implementMethod(
  target: any,
  method: IMethod,
  implementedProperties: Set<PropertyKey>,
): void {
  const propertyKey: PropertyKey = method.propertyKey;
  if (!implementedProperties.has(propertyKey)) {
    if (
      objectHasProperty(target, propertyKey)
      && (target[propertyKey] !== Object.prototype[propertyKey])
    ) {
      throw new Error(`The property '${ String(propertyKey) }' is already defined`);
    } else {
      objectDefineProperty(target, propertyKey, method.descriptor);
      implementedProperties.add(propertyKey);
    }
  }
}

