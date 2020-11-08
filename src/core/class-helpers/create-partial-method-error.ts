
export function CreatePartialMethodCallError(propertyKey: PropertyKey): Error {
  return new Error(`The method '${ String(propertyKey) }' is partially implemented: it requires other methods to run`);
}

