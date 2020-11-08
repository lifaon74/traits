/**
 * Creates an Error to throw when calling an abstract method
 */
export function CreateAbstractMethodCallError(propertyKey?: PropertyKey): Error {
  return new Error(`Call abstract method${ (propertyKey === void 0) ? '' : `'${ String(propertyKey) }'` }`);
}



