import { IInstanceOfFunction } from '../instance-of.function-definition';
import { IGenericInstanceConstructor, IInstanceConstructor } from '../types/instance-constructor.type';
import { IIsInstanceOf } from '../types/is-instance-of.type';

export function createInstanceOfFunction<GInstance>(
  ctorA: IInstanceConstructor<GInstance>,
): IInstanceOfFunction<GInstance> {
  return <GInstanceConstructor extends IGenericInstanceConstructor>(
    ctorB: GInstanceConstructor,
  ): IIsInstanceOf<GInstance, GInstanceConstructor> => {
    return ((ctorB as unknown) === (ctorA as unknown)) as any;
  };
}




