import { Trait } from '../../../../core/traits/trait-decorator';
import { TIteratorMapCallback } from './iterator-map';
import {
  TGenericTraitIteratorNext, TInferTraitIteratorNextGNext, TInferTraitIteratorNextGValue,
} from '../trait-iterator-next/trait-iterator-next';
import { IIteratorLike } from '../iterator-types';

@Trait()
export abstract class TraitIteratorMap<GSelf extends TGenericTraitIteratorNext> {
  abstract map<GMappedValue>(
    this: GSelf,
    callback: TIteratorMapCallback<TInferTraitIteratorNextGValue<GSelf>, GMappedValue>,
  ): IIteratorLike<GMappedValue, void, TInferTraitIteratorNextGNext<GSelf>>;
}
