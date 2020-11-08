import { DefineProperty } from '../../object-helpers/object-define-property';

export function CreatePrivateContext<GContext>(
  _symbol: symbol,
  target: any,
  context: GContext
): GContext {
  DefineProperty(target, _symbol, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: context,
  })
  return context;
}

// export function CreatePrivateContext<GValue>(
//   _symbol: symbol,
// ): [set: (target: any, value: GValue) => void, get: (target: any) => GValue] {
//   return [
//     (target: any, value: GValue): void => {
//       DefineProperty(target, _symbol, {
//         configurable: false,
//         enumerable: false,
//         writable: false,
//         value: value,
//       })
//     },
//     (target: any): GValue => {
//       return target[_symbol];
//     }
//   ]
// }

