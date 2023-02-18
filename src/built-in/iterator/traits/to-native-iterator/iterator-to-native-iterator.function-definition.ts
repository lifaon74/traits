
export interface IIteratorToNativeIteratorFunction<GIn, GOut, GReturn> {
  (): Iterator<GOut, GReturn, GIn>;
}

