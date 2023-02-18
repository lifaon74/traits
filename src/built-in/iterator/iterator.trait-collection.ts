import { IIteratorMapTrait } from './traits/map/iterator-map.trait';
import { IIteratorNewTrait } from './traits/new/iterator-new.trait';
import { IIteratorNextTrait } from './traits/next/iterator-next.trait';
import { IIteratorReduceTrait } from './traits/reduce/iterator-reduce.trait';
import { IIteratorToNativeIteratorTrait } from './traits/to-native-iterator/iterator-to-native-iterator.trait';

export interface IIteratorTraitCollection<GIn, GOut, GReturn> extends // traits
  IIteratorNewTrait,
  IIteratorNextTrait<GIn, GOut, GReturn>,
  IIteratorMapTrait<GIn, GOut, GReturn>,
  IIteratorReduceTrait<GIn, GOut, GReturn>,
  IIteratorToNativeIteratorTrait<GIn, GOut, GReturn>
//
{
}
