import { TGenericFunction } from '../types/function-types';
import { TAbstractClass, TClassType } from '../types/class-types';
import { CallFunction } from '../function-helpers/call-function';
import { TraitIsImplementedBy } from './trait-is-implemented-by';

export type TExtractTraitMethod<GTrait, GMethodName extends (keyof GTrait)> =
  GTrait[GMethodName] extends TGenericFunction
    ? GTrait[GMethodName]
    : never;

/**
 * If 'target' implements 'trait', returns target's implementation (target[methodName])
 * Else, returns a 'defaultFunction'
 */
export function GetTargetTraitMethodOrDefaultFunction<GTrait, GMethodName extends (keyof GTrait)>(
  target: any,
  trait: TAbstractClass<GTrait>,
  methodName: GMethodName,
  defaultFunction: TExtractTraitMethod<GTrait, GMethodName>,
): TExtractTraitMethod<GTrait, GMethodName> {
  return TraitIsImplementedBy(trait, target)
    ? target[methodName]
    : defaultFunction;
}

/**
 * Calls target[methodName] if 'target' implements 'trait',
 * Else calls 'defaultFunction'
 */
export function CallTargetTraitMethodOrDefaultFunction<GTrait, GMethodName extends (keyof GTrait)>(
  target: any,
  trait: TAbstractClass<GTrait>,
  methodName: GMethodName,
  args: Parameters<TExtractTraitMethod<GTrait, GMethodName>>,
  defaultFunction: TExtractTraitMethod<GTrait, GMethodName>,
): ReturnType<TExtractTraitMethod<GTrait, GMethodName>> {
  return CallFunction(GetTargetTraitMethodOrDefaultFunction<GTrait, GMethodName>(target, trait, methodName, defaultFunction), target, args);
}

/**
 * Calls target[methodName] if 'target' implements 'trait',
 * Else calls defaultImplementation.prototype[methodName]
 */
export function CallTargetTraitMethodOrDefaultImplementation<GTrait, GMethodName extends (keyof GTrait)>(
  target: any,
  trait: TAbstractClass<GTrait>,
  methodName: GMethodName,
  args: Parameters<TExtractTraitMethod<GTrait, GMethodName>>,
  defaultImplementation: TClassType<GTrait>,
): ReturnType<TExtractTraitMethod<GTrait, GMethodName>> {
  return CallTargetTraitMethodOrDefaultFunction<GTrait, GMethodName>(
    target,
    trait,
    methodName,
    args,
    defaultImplementation.prototype[methodName],
  );
}


