import { NEW } from '../../../../others/new/new.symbol.constant';
import { IIteratorTraitCollection } from '../../../iterator.trait-collection';
import { IIteratorNewTrait } from '../../new/iterator-new.trait';
import { IIteratorNextTrait } from '../../next/iterator-next.trait';
import { IIteratorMapFunction, IIteratorMapMapperFunction } from '../iterator-map.function-definition';

export interface ICreateIteratorMapFunctionUsing$Next$Options<GIn, GOut, GReturn> extends // traits
  IIteratorNewTrait,
  IIteratorNextTrait<GIn, GOut, GReturn>
//
{
}

export function createIteratorMapFunctionUsing$Next$<GIn, GOut, GReturn>(
  {
    [NEW]: _new,
    next,
  }: ICreateIteratorMapFunctionUsing$Next$Options<GIn, GOut, GReturn>,
): IIteratorMapFunction<GIn, GOut, GReturn> {
  return <GMapped>(
    mapper: IIteratorMapMapperFunction<GOut, GMapped>,
  ): IIteratorTraitCollection<GIn, GMapped, GReturn> => {
    return _new<GIn, GMapped, GReturn>(
      (function* (): Generator<GMapped, GReturn, GIn> {
        if (typeof mapper === 'function') {
          let index: number = 0;
          let _next!: GIn;

          let result: IteratorResult<GOut, GReturn>;
          while (!(result = next(_next)).done) {
            _next = yield mapper(result.value, index);
            index++;
          }
          // TODO support throw and return
          return result.value;
        } else {
          throw new TypeError(`Not callable`);
        }
      })(),
    );
  };
}

// 1. Let iterated be ? GetIteratorDirect(this value).
// 2. If IsCallable(mapper) is false, throw a TypeError exception.
// 3. Let closure be a new Abstract Closure with no parameters that captures iterated and mapper and performs the following steps when called:
//   a. Let counter be 0.
// b. Repeat,
//   i. Let next be ? IteratorStep(iterated).
//   ii. If next is false, return undefined.
//   iii. Let value be ? IteratorValue(next).
//   iv. Let mapped be Completion(Call(mapper, undefined, « value, 𝔽(counter) »)).
// v. IfAbruptCloseIterator(mapped, iterated).
//   vi. Let completion be Completion(Yield(mapped)).
// vii. IfAbruptCloseIterator(completion, iterated).
//   viii. Set counter to counter + 1.
// 4. Return CreateIteratorFromClosure(closure, "Iterator Helper", %IteratorHelperPrototype%).
