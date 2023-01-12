import { NEW } from '../../../others/new/new.symbol.constant';
import { IArrayNewFunction } from './array-new.function-definition';

export interface IArrayNewTrait {
  [NEW]: IArrayNewFunction;
}
