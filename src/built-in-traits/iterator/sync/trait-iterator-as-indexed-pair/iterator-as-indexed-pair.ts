// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.filter

export function * IteratorAsIndexedPair<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
): Generator<[GValue, number], void, GNext> {
  let index: number = 0;
  let lastValue: any = void 0;
  let result: IteratorResult<GValue>;
  while (!(result = iterator.next(lastValue)).done) {
    lastValue = yield [result.value, index];
    index++;
  }
}
