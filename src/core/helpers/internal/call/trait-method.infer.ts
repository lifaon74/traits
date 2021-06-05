import { IGenericFunction } from '../../../../types';

export type IInferTraitMethod<GTrait, GMethodName extends (keyof GTrait)> =
  GTrait[GMethodName] extends IGenericFunction
    ? GTrait[GMethodName]
    : never;
