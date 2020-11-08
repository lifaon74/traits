export interface TConstructor<GInstance = any, GArguments extends any[] = any[]> {
  new(...args: GArguments): GInstance;
}

export interface THavingPrototype<GPrototype = any> {
  prototype: GPrototype;
}

export interface TAbstractClass<GPrototype = any> extends Omit<Function, 'prototype'>, THavingPrototype<GPrototype> {
}

export type TInferPrototype<GTarget extends THavingPrototype> =
  GTarget extends THavingPrototype<infer GPrototype>
    ? GPrototype
    : never;



export type TClassType<Instance = any> = TAbstractClass<Instance> | TConstructor<Instance>;

export type TInferClassParameters<GClass extends TClassType> =
  GClass extends TConstructor
    ? ConstructorParameters<GClass>
    : [];

export type TInferClassInstance<GClass extends TClassType> =
  GClass extends TConstructor
    ? InstanceType<GClass>
    : TInferPrototype<GClass>;




// excludes the constructor from GTarget
export type TOmitConstructor<GTarget> = {
  [GKey in keyof GTarget]: GTarget[GKey] extends new(...args: any[]) => any ? never : GTarget[GKey];
};

// excludes the 'prototype' from GTarget
export type TOmitPrototype<GTarget> = Omit<GTarget, 'prototype'>;

export type TOmitConstructorAndPrototype<GTarget> = TOmitPrototype<TOmitConstructor<GTarget>>;



export type TFactory = <TBase extends TConstructor>(superClass: TBase) => TBase;




export type TMakeTypedConstructor<GTypedInstance, Args extends any[], GConstructor extends TConstructor<GTypedInstance, Args>> =
  TOmitConstructor<GConstructor>
  & {
  new(...args: Args): GTypedInstance;
}

export type TConstructorOrVoid = TConstructor | void | undefined;
export type TClassOrVoid = TClassType | void | undefined;

export type TBaseClassIsUndefinedOrVoid<GBaseClass extends TClassOrVoid> =
  [void] extends [GBaseClass]
    ? true
    : (
      [undefined] extends [GBaseClass]
        ? true
        : false
      );
