import {
  TGenericTraitIteratorNext,
  TInferTraitIteratorNextGNext,
  TInferTraitIteratorNextGValue,
} from '../trait-iterator-next/trait-iterator-next';
import { IIteratorLike } from '../iterator-types';
import { Trait } from '../../../../core/traits/trait-decorator';


@Trait()
export abstract class TraitIteratorDrop<GSelf extends TGenericTraitIteratorNext> {
  abstract drop(this: GSelf, limit: number): IIteratorLike<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>>;
}



