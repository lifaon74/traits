import { IArrayTraitCollection } from '../array.trait-collection';
import { IReadonlyArrayTraitCollection } from '../readonly-array.trait-collection';
import { IArrayNewInput } from '../traits/new/array-new.function-definition';
import { createReadonlyArray } from './create-readonly-array';

export function createArray<GValue>(
  input: IArrayNewInput<GValue>,
): IArrayTraitCollection<GValue> {
  const parent: IReadonlyArrayTraitCollection<GValue> = createReadonlyArray<GValue>(input);

  return {
    ...parent,
  };
}


