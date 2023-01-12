import { IArrayAtTrait } from '../../at/array-at.trait';
import { IArrayGetLengthTrait } from '../../get-length/array-get-length.trait';
import { IArrayReduceFunction, IArrayReduceReducerFunction } from '../array-reduce.function-definition';

export interface ICreateArrayReduceFunctionUsing$GetLengthAndAt$Options<GValue> extends // traits
  IArrayGetLengthTrait,
  IArrayAtTrait<GValue>
//
{
}

export function createArrayReduceFunctionUsing$GetLengthAndAt$<GValue>(
  {
    getLength,
    at,
  }: ICreateArrayReduceFunctionUsing$GetLengthAndAt$Options<GValue>,
): IArrayReduceFunction<GValue> {
  return <GReduced>(
    reducer: IArrayReduceReducerFunction<GValue, GReduced>,
    ...args: [initialValue?: GReduced]
  ): GReduced => {
    if (typeof reducer === 'function') {
      let _accumulator: GReduced;
      let index: number;

      if (args.length === 0) {
        if (getLength() == 0) {
          throw new TypeError(`Missing initialValue`);
        } else {
          _accumulator = at(0) as unknown as GReduced;
          index = 1;
        }
      } else {
        _accumulator = args[0] as GReduced;
        index = 0;
      }

      while (index < getLength()) {
        _accumulator = reducer(
          _accumulator,
          at(index)!,
          index,
        );
        index++;
      }

      return _accumulator;
    } else {
      throw new TypeError(`Not callable`);
    }
  };
}
