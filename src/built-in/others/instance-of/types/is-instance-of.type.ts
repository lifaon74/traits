import { IGenericInstanceConstructor, IInstanceConstructor } from './instance-constructor.type';

export type IIsInstanceOf<GInstance, GInstanceConstructor extends IGenericInstanceConstructor> =
  GInstanceConstructor extends IInstanceConstructor<GInstance>
    ? true
    : false;
