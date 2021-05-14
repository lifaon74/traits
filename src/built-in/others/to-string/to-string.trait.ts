import { Trait } from '../../../core';

@Trait()
export abstract class ToStringTrait<GSelf> {
  abstract toString(this: GSelf): string;
}
