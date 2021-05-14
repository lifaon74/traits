import { Trait } from '../../../core';

@Trait()
export abstract class SubtractTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract subtract(this: GSelf, value: GValue): GReturn;
}
