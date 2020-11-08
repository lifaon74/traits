
// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.drop

export function * IteratorDrop<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  limit: number
): Generator<GValue, void, GNext> {
  if (typeof limit === 'number') {
    if (Number.isSafeInteger(limit) && (limit >= 0)) {
      let result: IteratorResult<GValue>;
      while ((limit-- > 0) && !(result = iterator.next()).done) {
      }
      let lastValue: any = void 0;
      while (!(result = iterator.next(lastValue)).done) {
        lastValue = yield result.value;
      }
    } else {
      throw new RangeError(`Expected number in the range [0, Number.MAX_SAFE_INTEGER]`);
    }
  } else {
    throw new TypeError(`Expected number as 'limit'`);
  }
}
