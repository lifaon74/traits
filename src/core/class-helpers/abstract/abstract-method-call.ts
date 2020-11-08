import { CreateAbstractMethodCallError } from './create-abstract-method-error';

/**
 * Throws an abstract method call Error
 */
export function AbstractMethodCall(propertyKey?: PropertyKey): never {
  throw CreateAbstractMethodCallError(propertyKey);
}
