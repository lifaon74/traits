import { Trait } from '../../../core/traits/trait-decorator';


@Trait()
export abstract class TraitGetQueue<GSelf> {
  abstract getQueue(this: GSelf): Promise<void>;
}

