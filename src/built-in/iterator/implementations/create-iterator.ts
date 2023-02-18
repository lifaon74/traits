import { NEW } from '../../others/new/new.symbol.constant';
import { IIteratorTraitCollection } from '../iterator.trait-collection';
import { createIteratorMapFunctionUsing$Next$ } from '../traits/map/derived/iterator-map-function.create.using-next';
import { createIteratorReduceFunctionUsing$Next$ } from '../traits/reduce/derived/iterator-reduce-function.create.using-next';

export function createIterator<GIn, GOut, GReturn>(
  iterator: Iterator<GOut, GReturn, GIn>,
): IIteratorTraitCollection<GIn, GOut, GReturn> {

  const _new = createIterator;

  const next = (
    value: GIn,
  ): IteratorResult<GOut, GReturn> => {
    return iterator.next(value);
  };

  const map = createIteratorMapFunctionUsing$Next$({
    [NEW]: _new,
    next,
  });

  const reduce = createIteratorReduceFunctionUsing$Next$({
    next,
  });

  const toNativeIterator = (): Iterator<GOut, GReturn, GIn> => {
    return iterator;
  };

  return {
    [NEW]: _new,
    next,
    map,
    reduce,
    toNativeIterator,
  };
}


