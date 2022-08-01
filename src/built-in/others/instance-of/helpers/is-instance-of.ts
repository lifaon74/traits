import { INSTANCE_OF } from '../instance-of.symbol.constant';
import { IInstanceOfTrait } from '../instance-of.trait';
import { IGenericInstanceConstructor, IInferInstanceConstructorInstance } from '../types/instance-constructor.type';

export function isInstanceOf<GInstanceConstructor extends IGenericInstanceConstructor>(
  instance: IInstanceOfTrait<unknown>,
  ctor: GInstanceConstructor,
): instance is IInferInstanceConstructorInstance<GInstanceConstructor> {
  return instance[INSTANCE_OF](ctor);
}
