import { IInstanceConstructor } from '../types/instance-constructor.type';

export function createVirtualConstructor<GInstance>(): IInstanceConstructor<GInstance> {
  return (): never => {
    throw new Error(`Cannot call a virtual constructor`);
  }
}
