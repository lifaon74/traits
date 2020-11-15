import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitEventListenerIsDispatching<GSelf> {
  abstract isDispatching(this: GSelf): boolean;
}
