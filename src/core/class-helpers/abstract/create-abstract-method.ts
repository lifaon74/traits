import { AbstractMethodCall } from './abstract-method-call';

/**
 * Creates a function which throws when calling.
 */
export function CreateAbstractMethod(propertyKey?: PropertyKey): () => never {
  return () => {
    AbstractMethodCall(propertyKey);
  };
}
