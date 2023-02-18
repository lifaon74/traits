import { IInstanceOfFunction } from '../instance-of.function-definition';
import { IInstanceConstructor } from '../types/instance-constructor.type';
import { createInstanceOfFunction } from './create-instance-of-function';
import { createVirtualConstructor } from './create-virtual-constructor';

export type IInstanceOfFunctionTuple<GInstance> = [
  token: IInstanceConstructor<GInstance>,
  isntanceOf: IInstanceOfFunction<GInstance>,
];

export function createInstanceOfTuple<GInstance>(): IInstanceOfFunctionTuple<GInstance> {
  const token: IInstanceConstructor<GInstance> = createVirtualConstructor<GInstance>();
  return [
    token,
    createInstanceOfFunction<GInstance>(token),
  ];
}
