import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitIsActivated<GSelf> {
  abstract isActivated(this: GSelf): boolean;
}

