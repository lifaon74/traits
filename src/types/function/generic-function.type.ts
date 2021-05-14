export type IGenericFunction<GArguments extends any[] = any[], GReturn = any, GThis = any> =
  (this: GThis, ...args: GArguments) => GReturn;
