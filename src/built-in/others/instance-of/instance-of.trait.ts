import { IInstanceOfFunction } from './instance-of.function-definition';
import { INSTANCE_OF } from './instance-of.symbol.constant';

export interface IInstanceOfTrait<GInstanceOf extends object> {
  [INSTANCE_OF]: IInstanceOfFunction<GInstanceOf>;
}
