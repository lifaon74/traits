import { Trait } from '../../../core';

@Trait()
export abstract class DivideTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract divide(this: GSelf, value: GValue): GReturn;
}
