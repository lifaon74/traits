import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TGenericTraitIteratorNext, TInferTraitIteratorNextGNext, TInferTraitIteratorNextGValue,
} from '../trait-iterator-next/trait-iterator-next';
import { IIteratorLike } from '../iterator-types';

@Trait()
export abstract class TraitIteratorAsIndexedPair<GSelf extends TGenericTraitIteratorNext> {
  abstract asIndexedPair(
    this: GSelf,
  ): IIteratorLike<[TInferTraitIteratorNextGValue<GSelf>, number], void, TInferTraitIteratorNextGNext<GSelf>>;
}

