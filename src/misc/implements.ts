import { IGenericFunction } from './types/generic-function.type';

export type IImplements<GInstance, GPropertyKey extends PropertyKey, GValue> =
  GInstance
  & Record<GPropertyKey, GValue>

export function isImplemented<GInstance, GPropertyKey extends PropertyKey, GValue>(
  instance: GInstance,
  propertyKey: GPropertyKey,
): instance is IImplements<GInstance, GPropertyKey, GValue> {
  return (propertyKey in instance);
}

/*------------*/

export interface ICreateTraitFunctionReturnRegisterFunction<GFunction extends IGenericFunction> {
  (
    fnc: GFunction,
  ): void;
}

export interface ICreateTraitFunctionReturnIsFunction<GFunction extends IGenericFunction> {
  (
    value: unknown,
  ): value is GFunction;
}

export type ICreateTraitFunctionReturn<GFunction extends IGenericFunction> = [
  register: ICreateTraitFunctionReturnRegisterFunction<GFunction>,
  is: ICreateTraitFunctionReturnIsFunction<GFunction>,
];

export function createTraitFunction<GFunction extends IGenericFunction>(): ICreateTraitFunctionReturn<GFunction> {
  const list = new WeakSet<GFunction>();

  const register = (
    fnc: GFunction,
  ): void => {
    list.add(fnc);
  };

  const is = (
    value: unknown,
  ): value is GFunction => {
    return list.has(value as any);
  };

  return [
    register,
    is,
  ];
}



/*------------*/

// export type ITrait = {
//
// }
//
// export function createTrait<GPropertyName extends PropertyKey, GFunction extends IGenericFunction>(): ICreateTraitFunctionReturn<GFunction> {
//   const list = new WeakSet<GFunction>();
//
//   const register = (
//     fnc: GFunction,
//   ): void => {
//     list.add(fnc);
//   };
//
//   const is = (
//     value: unknown,
//   ): value is GFunction => {
//     return list.has(value as any);
//   };
//
//   return [
//     register,
//     is,
//   ];
// }
