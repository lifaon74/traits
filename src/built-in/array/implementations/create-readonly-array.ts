import { createIterator } from '../../iterator/implementations/create-iterator';
import { IIteratorTraitCollection } from '../../iterator/iterator.trait-collection';
import { NEW } from '../../others/new/new.symbol.constant';
import { IReadonlyArrayTraitCollection } from '../readonly-array.trait-collection';
import { IArrayNewInput } from '../traits/new/array-new.function-definition';
import { arrayNewInputToArray } from './array-new-input-to-array';
import { createArray } from './create-array';

export function createReadonlyArray<GValue>(
  input: IArrayNewInput<GValue>,
): IReadonlyArrayTraitCollection<GValue> {
  const _array: GValue[] = arrayNewInputToArray<GValue>(input);

  const _new = createArray;

  const getLength = (): number => {
    return _array.length;
  };

  const at = (
    index: number,
  ): GValue | undefined => {
    return _array.at(index);
  };

  const iterator = (): IIteratorTraitCollection<void, GValue, void> => {
    return createIterator<void, GValue, void>(_array[Symbol.iterator]());
  };

  // const reduce = <GReduced>(
  //   reducer: IArrayReduceReducerFunction<GValue, GReduced>,
  //   ...args: [initialValue?: GReduced]
  // ): GReduced => {
  //   return _array.reduce<GReduced>(reducer, ...args);
  // };

  const reduce = _array.reduce.bind(_array);

  return {
    [NEW]: _new,
    getLength,
    at,
    [Symbol.iterator]: iterator,
    reduce,
  };
}
