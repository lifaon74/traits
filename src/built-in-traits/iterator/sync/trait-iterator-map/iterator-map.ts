// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.map

export type TIteratorMapCallback<GValue, GMappedValue> = (value: GValue) => GMappedValue;

export function * IteratorMap<GValue, GMappedValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorMapCallback<GValue, GMappedValue>,
): Generator<GMappedValue, void, GNext> {
  if (typeof callback === 'function') {
    let lastValue: any = void 0;
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next(lastValue)).done) {
      lastValue = yield callback(result.value);
    }
  } else {
    throw new TypeError(`Expected function as callback`);
  }
}
