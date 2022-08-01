export interface IInstanceConstructor<GInstance> {
  (...args: any[]): GInstance;
}

export type IGenericInstanceConstructor = IInstanceConstructor<any>;

export type IInferInstanceConstructorInstance<GInstanceConstructor extends IGenericInstanceConstructor> =
  GInstanceConstructor extends IInstanceConstructor<infer GInstance>
    ? GInstance
    : never;
