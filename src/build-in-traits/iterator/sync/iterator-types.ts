import { TraitIteratorNext } from './trait-iterator-next/trait-iterator-next';
import { VoidArgument } from '../../../core/types/void-argument';
import { TraitIsImplementedBy } from '../../../core/traits/trait-is-implemented-by';

export type IteratorDefaultGReturn = any;

export type IteratorDefaultGNext = undefined;

/*--*/

export type TGenericIterator = Iterator<any, any, any>;

export type TInferIteratorGValue<GIterator extends TGenericIterator> =
  GIterator extends Iterator<infer GValue, any, any>
    ? GValue
    : never;

export type TInferIteratorGReturn<GIterator extends TGenericIterator> =
  GIterator extends Iterator<any, infer GReturn, any>
    ? GReturn
    : never;

export type TInferIteratorGNext<GIterator extends TGenericIterator> =
  GIterator extends Iterator<any, any, infer GNext>
    ? GNext
    : never;


// export type TIteratorNextFunction<GValue, GReturn, GNext> = TraitIteratorNext<any, GValue, GReturn, GNext>['next'];
export type TIteratorNextFunction<GValue, GReturn, GNext> = (...value: VoidArgument<GNext>) => IteratorResult<GValue, GReturn>;

/*--*/

export interface TIterable<GValue, GReturn, GNext> {
  [Symbol.iterator](): Iterator<GValue, GReturn, GNext>;
}

export type TGenericIterable = TIterable<any, any, any>;

export type TInferIterableGValue<GIterable extends TGenericIterable> =
  GIterable extends TIterable<infer GValue, any, any>
    ? GValue
    : never;

export type TInferIterableGReturn<GIterable extends TGenericIterable> =
  GIterable extends TIterable<any, infer GReturn, any>
    ? GReturn
    : never;

export type TInferIterableGNext<GIterable extends TGenericIterable> =
  GIterable extends TIterable<any, any, infer GNext>
    ? GNext
    : never;

export type TInferIterableGIterator<GIterable extends TGenericIterable> = Iterator<TInferIterableGValue<GIterable>, TInferIterableGReturn<GIterable>, TInferIterableGNext<GIterable>>;


/*--*/

export interface IIteratorLike<GValue, GReturn, GNext> extends TraitIteratorNext<any, GValue, GReturn, GNext> {
}

export type TGenericIteratorLike = IIteratorLike<any, any, any>;

export function IsIteratorLike<GValue, GReturn, GNext>(value: any): value is IIteratorLike<GValue, GReturn, GNext> {
  return TraitIsImplementedBy(TraitIteratorNext, value);
}
