import { Trait } from '../../../../core/traits/trait-decorator';
import { TGenericIteratorLike } from '../iterator-types';

@Trait()
export abstract class TraitIterable<GSelf, GIteratorNext extends TGenericIteratorLike> {
  abstract [Symbol.iterator](this: GSelf): GIteratorNext;
}


