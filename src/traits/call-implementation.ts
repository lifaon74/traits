export type CallImplementationThis<
  GImplementation,
  GMethodName extends keyof GImplementation,
> = GImplementation[GMethodName] extends (this: infer GThis, ...args: any[]) => any ? GThis : never;

export type CallImplementationParameters<
  GImplementation,
  GMethodName extends keyof GImplementation,
> = GImplementation[GMethodName] extends (...args: infer GArgs) => any ? GArgs : never;

export type CallImplementationReturn<
  GImplementation,
  GMethodName extends keyof GImplementation,
> = GImplementation[GMethodName] extends (...args: any[]) => infer GReturn ? GReturn : never;

export function callImplementation<GImplementation, GMethodName extends keyof GImplementation>(
  implementation: abstract new () => GImplementation,
  methodName: GMethodName,
  _this: CallImplementationThis<GImplementation, GMethodName>,
  args: CallImplementationParameters<GImplementation, GMethodName>,
): CallImplementationReturn<GImplementation, GMethodName> {
  return Reflect.apply(implementation.prototype[methodName], _this, args);
}

export function callImplementationStatic<
  GImplementation,
  GMethodName extends keyof GImplementation,
>(
  implementation: GImplementation,
  methodName: GMethodName,
  _this: CallImplementationThis<GImplementation, GMethodName>,
  args: CallImplementationParameters<GImplementation, GMethodName>,
): CallImplementationReturn<GImplementation, GMethodName> {
  return Reflect.apply(implementation[methodName] as any, _this, args);
}
