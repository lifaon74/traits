import { IGenericInstanceConstructor } from './types/instance-constructor.type';
import { IIsInstanceOf } from './types/is-instance-of.type';

export interface IInstanceOfFunction<GInstance> {
  <GInstanceConstructor extends IGenericInstanceConstructor>(
    ctor: GInstanceConstructor,
  ): IIsInstanceOf<GInstance, GInstanceConstructor>;
}
