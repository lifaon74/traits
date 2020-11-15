import { Trait } from '../../../../core/traits/trait-decorator';
import { VoidArgument } from '../../../../core/types/void-argument';

// https://doc.rust-lang.org/src/core/iter/traits/iterator.rs.html#98-3260

export type IteratorNext<GValue, GReturn, GNext> = Pick<Iterator<GValue, GReturn, GNext>, 'next'>;

@Trait()
export abstract class TraitIteratorNext<GSelf, GValue, GReturn, GNext> /* implements IteratorNext<GValue, GReturn, GNext> */ {
  abstract next(this: GSelf, ...value: VoidArgument<GNext>): IteratorResult<GValue, GReturn>;
}

export type TGenericTraitIteratorNext = TraitIteratorNext<any, any, any, any>;

export type TInferTraitIteratorNextGValue<GTrait extends TGenericTraitIteratorNext> =
  GTrait extends TraitIteratorNext<any, infer GValue, any, any>
    ? GValue
    : never;

export type TInferTraitIteratorNextGReturn<GTrait extends TGenericTraitIteratorNext> =
  GTrait extends TraitIteratorNext<any, any, infer GReturn, any>
    ? GReturn
    : never;

export type TInferTraitIteratorNextGNext<GTrait extends TGenericTraitIteratorNext> =
  GTrait extends TraitIteratorNext<any, any, any, infer GNext>
    ? GNext
    : never;

