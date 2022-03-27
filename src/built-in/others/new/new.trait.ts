import { NEW } from './new.symbol.constant';
import { INewFunction } from './new.function-definition';

export interface INewTrait<GArguments extends any[], GReturn> {
  [NEW]: INewFunction<GArguments, GReturn>;
}
