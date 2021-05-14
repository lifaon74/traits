import { Trait } from '../../../core';
import { NEW } from './new.symbol.constant';

@Trait()
export abstract class NewTrait<GSelf, GArguments extends any[], GReturn> {
  abstract [NEW](this: GSelf, ...args: GArguments): GReturn;
}
