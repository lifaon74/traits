import { IInstanceOfFunction } from './instance-of.function-definition';

export function createInstanceOfFunction<GInstanceOf>(
  _constructor: (...args: any[]) => GInstanceOf,
): IInstanceOfFunction<GInstanceOf> {
  return (
    value: unknown,
  ): value is GInstanceOf => {
    return (value === _constructor);
  };
}


// export function createInstanceOfFunction<GInstanceOf>(): IInstanceOfFunction<GInstanceOf> {
//   const instanceOf = (
//     value: unknown,
//   ): value is GInstanceOf => {
//     return (value !== null)
//       && (value !== void 0)
//       && ((value as any).instanceOf === instanceOf);
//   };
//
//   return instanceOf;
// }

