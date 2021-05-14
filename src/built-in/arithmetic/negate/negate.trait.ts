import { Trait } from '../../../core';

@Trait()
export abstract class NegateTrait<GSelf, GReturn = GSelf> {
  abstract negate(this: GSelf): GReturn;
}

