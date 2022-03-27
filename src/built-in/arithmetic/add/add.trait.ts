import { IAddFunction } from './add.function-definition';

export interface IAddTrait<GValue, GReturn> {
  add: IAddFunction<GValue, GReturn>;
}

