export interface IIteratorNextFunction<GIn, GOut, GReturn> {
  (
    next: GIn,
  ): IteratorResult<GOut, GReturn>;
}


// export type IIteratorNextArgument<GIn> =
//   GIn extends void
//     ? [(undefined | void)?]
//     : [GIn]
//   ;
//
// export interface IIteratorNextFunction<GIn, GOut, GReturn> {
//   (
//     ...args: IIteratorNextArgument<GIn>
//   ): IteratorResult<GOut, GReturn>;
// }


// export type IIteratorNextArgument<GValue> =
//   | []
//   | [GValue]
// ;
//
// export interface IIteratorNextFunction<GValue, GReturn, GNext> {
//   (
//     ...args: IIteratorNextArgument<GValue>
//   ): IteratorResult<GValue, GReturn>;
// }

// interface Iterator<T, TReturn = any, TNext = undefined> {
//   // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
//   next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
//   return?(value?: TReturn): IteratorResult<T, TReturn>;
//   throw?(e?: any): IteratorResult<T, TReturn>;
// }
