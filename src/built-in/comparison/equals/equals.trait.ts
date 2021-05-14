import { Trait } from '../../../core';

@Trait()
export abstract class EqualsTrait<GSelf, GValue = GSelf> {
  abstract equals(this: GSelf, value: GValue): boolean;
}



