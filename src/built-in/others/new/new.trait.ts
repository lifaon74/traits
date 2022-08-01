import { INewFunction } from './new.function-definition';
import { NEW } from './new.symbol.constant';

export interface INewTrait<GArguments extends any[], GReturn> {
  [NEW]: INewFunction<GArguments, GReturn>;
}
