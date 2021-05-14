import { Trait } from '../../../core';

@Trait()
export abstract class MultiplyTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract multiply(this: GSelf, value: GValue): GReturn;
}

