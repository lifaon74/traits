import { IGenericFunction, IInferFunctionThis } from '../../types';


/**
 * Calls the function 'fnc' with the list of arguments 'args' and with the specific this 'thisArg'
 *  INFO: used for better typing of '.apply' and potential smaller bundle size
 */
export function callFunction<GFunction extends IGenericFunction>(
  fnc: GFunction,
  thisArg: IInferFunctionThis<GFunction>,
  args: Parameters<GFunction>
): ReturnType<GFunction> {
  // Function.prototype.apply.call
  return Reflect.apply(fnc, thisArg, args);
}
