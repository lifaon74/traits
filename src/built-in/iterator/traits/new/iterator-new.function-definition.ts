import { IIteratorTraitCollection } from '../../iterator.trait-collection';

// export type IIteratorNewFunction<GIn, GOut, GReturn> = INewFunction<[Iterator<GOut, GReturn, GIn>], IIteratorTraitCollection<GIn, GOut, GReturn>>;

export interface IIteratorNewFunction {
  <GIn, GOut, GReturn>(
    iterator: Iterator<GOut, GReturn, GIn>,
  ): IIteratorTraitCollection<GIn, GOut, GReturn>;
}


