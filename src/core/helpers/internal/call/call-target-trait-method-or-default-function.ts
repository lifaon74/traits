import { callFunction } from '../../../../misc/function/call-function';
import { getTargetTraitMethodOrDefaultFunction } from './get-target-trait-method-or-default-function';
import { IInferTraitMethod } from './trait-method.infer';
import { IAbstractConstructor } from '../../../../types/class/abstract-class-constructor.type';

/**
 * Calls target[methodName] if 'target' implements 'trait',
 * Else calls 'defaultFunction'
 */
export function callTargetTraitMethodOrDefaultFunction<GTrait, GMethodName extends (keyof GTrait)>(
  target: any,
  trait: IAbstractConstructor<GTrait>,
  methodName: GMethodName,
  args: Parameters<IInferTraitMethod<GTrait, GMethodName>>,
  defaultFunction: IInferTraitMethod<GTrait, GMethodName>,
): ReturnType<IInferTraitMethod<GTrait, GMethodName>> {
  return callFunction(getTargetTraitMethodOrDefaultFunction<GTrait, GMethodName>(target, trait, methodName, defaultFunction), target, args);
}

