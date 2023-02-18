import { createIterator } from '../src/built-in/iterator/create-iterator';
import { IIteratorTraitCollection } from '../src/built-in/iterator/iterator.trait-collection';
import { IIterableIteratorTraitCollection } from './iterable-iterator.trait-collection';

/**
 * @deprecated
 */
export function createIterableIterator<GIn, GOut, GReturn>(
  iterable: Iterable<GOut>,
): IIterableIteratorTraitCollection<GIn, GOut, GReturn> {
  const parent: IIteratorTraitCollection<GIn, GOut, GReturn> = createIterator<GIn, GOut, GReturn>(
    iterable[Symbol.iterator]() as Iterator<GOut, GReturn, GIn>,
  );

  // const _new = createIterableIterator;

  const self: IIterableIteratorTraitCollection<GIn, GOut, GReturn> = {
    ...parent,
    // [NEW]: _new,
    [Symbol.iterator]: (): IIteratorTraitCollection<GIn, GOut, GReturn> => {
      return self;
    },
  };

  return self;
}


