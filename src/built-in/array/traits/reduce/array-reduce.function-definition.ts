
export interface IArrayReduceReducerFunction<GValue, GReduced> {
  (
    previousValue: GReduced,
    currentValue: GValue,
    index: number,
  ): GReduced;
}


export interface IArrayReduceFunction<GValue> {
  (
    reducer: IArrayReduceReducerFunction<GValue, GValue>,
  ): GValue;
  <GReduced>(
    reducer: IArrayReduceReducerFunction<GValue, GReduced>,
    initialValue: GReduced,
  ): GReduced;
}
