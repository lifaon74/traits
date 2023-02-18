
export interface IIteratorReduceReducerFunction<GOut, GReduced> {
  (
    previousValue: GReduced,
    currentValue: GOut,
    index: number,
  ): GReduced;
}


export interface IIteratorReduceFunction<GIn, GOut, GReturn> {
  (
    reducer: IIteratorReduceReducerFunction<GOut, GOut>,
  ): GOut;
  <GReduced>(
    reducer: IIteratorReduceReducerFunction<GOut, GReduced>,
    initialValue: GReduced,
  ): GReduced;
}
