export interface IInstanceOfFunction<GInstanceOf> {
  (
    value: unknown,
  ): value is GInstanceOf;
}

// export interface IInstanceOfFunction<GInstanceOf> {
//   (
//     value: unknown,
//   ): value is GInstanceOf;
// }
