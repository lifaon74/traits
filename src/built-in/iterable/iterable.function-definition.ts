import { IIteratorTraitCollection } from '../iterator/iterator.trait-collection';

export interface IIterableFunction<GIn, GOut, GReturn> {
  // (): IterableIterator<GValue>;
  (): IIteratorTraitCollection<GIn, GOut, GReturn>;
}

