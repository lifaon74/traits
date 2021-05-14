export type IAbstractConstructor<GInstance = any, GArguments extends any[] = any[]> =
  abstract new(...args: GArguments) => GInstance;
