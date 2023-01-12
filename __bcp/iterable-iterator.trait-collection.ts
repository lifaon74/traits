import { IIteratorTraitCollection } from '../src/built-in/iterator/iterator.trait-collection';
import { IIterableTrait } from '../src/built-in/iterable/traits/iterable/iterable.trait';

/**
 * @deprecated
 */
export interface IIterableIteratorTraitCollection<GIn, GOut, GReturn> extends IIteratorTraitCollection<GIn, GOut, GReturn>,// traits
  IIterableTrait<GIn, GOut, GReturn>
//
{
}

// export interface IIterableIteratorTraitCollection<GIn, GOut, GReturn> extends Omit<IIteratorTraitCollection<GIn, GOut, GReturn>, typeof NEW>,// traits
//   IIterableIteratorNewTrait,
//   IIterableTrait<GIn, GOut, GReturn>
// //
// {
// }
