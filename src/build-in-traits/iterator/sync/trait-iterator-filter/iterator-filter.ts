// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.filter

export type TIteratorFilterCallback<GValue> = (value: GValue) => boolean;

export function * IteratorFilter<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorFilterCallback<GValue>,
): Generator<GValue, void, GNext> {
  if (typeof callback === 'function') {
    let lastValue: any = void 0;
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next(lastValue)).done) {
      if (callback(result.value)) {
        lastValue = yield result.value;
      }
    }
  } else {
    throw new TypeError(`Expected function as callback`);
  }
}
