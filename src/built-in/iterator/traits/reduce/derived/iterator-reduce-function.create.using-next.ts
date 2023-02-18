import { IIteratorNextTrait } from '../../next/iterator-next.trait';
import { IIteratorReduceFunction, IIteratorReduceReducerFunction } from '../iterator-reduce.function-definition';

export interface ICreateIteratorReduceFunctionUsing$Next$Options<GIn, GOut, GReturn> extends // traits
  IIteratorNextTrait<GIn, GOut, GReturn>
//
{
}

export function createIteratorReduceFunctionUsing$Next$<GIn, GOut, GReturn>(
  {
    next,
  }: ICreateIteratorReduceFunctionUsing$Next$Options<GIn, GOut, GReturn>,
): IIteratorReduceFunction<GIn, GOut, GReturn> {
  return <GReduced>(
    reducer: IIteratorReduceReducerFunction<GOut, GReduced>,
    ...args: [initialValue?: GReduced]
  ): GReduced => {
    if (typeof reducer === 'function') {
      let _accumulator: GReduced;
      let index: number;

      if (args.length === 0) {
        const { done, value }: IteratorResult<GOut, GReturn> = next(void 0 as any);
        if (done) {
          throw new TypeError(`Missing initialValue`);
        } else {
          _accumulator = value as unknown as GReduced;
          index = 1;
        }
      } else {
        _accumulator = args[0] as GReduced;
        index = 0;
      }

      let result: IteratorResult<GOut, GReturn>;
      while (!(result = next(void 0 as any)).done) {
        _accumulator = reducer(
          _accumulator,
          result.value,
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

// 1. Let iterated be ? GetIteratorDirect(this value).
// 2. If IsCallable(reducer) is false, throw a TypeError exception.
// 3. If initialValue is not present, then
// a. Let next be ? IteratorStep(iterated).
//   b. If next is false, throw a TypeError exception.
//   c. Let accumulator be ? IteratorValue(next).
//   d. Let counter be 1.
// 4. Else,
//   a. Let accumulator be initialValue.
//   b. Let counter be 0.
// 5. Repeat,
//   a. Let next be ? IteratorStep(iterated).
//   b. If next is false, return accumulator.
//   c. Let value be ? IteratorValue(next).
//   d. Let result be Completion(Call(reducer, undefined, « accumulator, value, 𝔽(counter) »)).
// e. IfAbruptCloseIterator(result, iterated).
//   f. Set accumulator to result.[[Value]].
//   g. Set counter to counter + 1.
