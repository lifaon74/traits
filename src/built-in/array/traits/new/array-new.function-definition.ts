import { IArrayTraitCollection } from '../../array.trait-collection';

export type IArrayNewInput<GValue> =
  // | Iterator<GValue>
  | Iterable<GValue>
  | ArrayLike<GValue>
  ;

export interface IArrayNewFunction {
  <GValue>(
    input: IArrayNewInput<GValue>,
  ): IArrayTraitCollection<GValue>;
}


