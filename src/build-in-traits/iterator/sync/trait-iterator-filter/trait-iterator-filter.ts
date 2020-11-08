import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TGenericTraitIteratorNext, TInferTraitIteratorNextGNext, TInferTraitIteratorNextGValue,
} from '../trait-iterator-next/trait-iterator-next';
import { TIteratorFilterCallback } from './iterator-filter';
import { IIteratorLike } from '../iterator-types';

@Trait()
export abstract class TraitIteratorFilter<GSelf extends TGenericTraitIteratorNext> {
  abstract filter(
    this: GSelf,
    callback: TIteratorFilterCallback<TInferTraitIteratorNextGValue<GSelf>>,
  ): IIteratorLike<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>>;
}
