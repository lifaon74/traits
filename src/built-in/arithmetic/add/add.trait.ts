import { Trait } from '../../../core';

@Trait()
export abstract class AddTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
