import { IInstanceOfFunction } from './instance-of.function-definition';
import { INSTANCE_OF } from './instance-of.symbol.constant';

/**
 * @deprecated
 */
export interface IInstanceOfTrait<GInstance> {
  [INSTANCE_OF]: IInstanceOfFunction<GInstance>;
}
