import { TGenericFunction } from '../types/function-types';

export function IsNativeFunction(fnc: TGenericFunction): boolean {
  return /\{\s+\[native code\]/.test(Function.prototype.toString.call(fnc));
}
