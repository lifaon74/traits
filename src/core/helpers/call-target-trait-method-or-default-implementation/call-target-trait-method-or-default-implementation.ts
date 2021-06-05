import { callTargetTraitMethodOrDefaultFunction } from '../internal/call/call-target-trait-method-or-default-function';
import { IAbstractConstructor } from '../../../types/class/abstract-class-constructor.type';
import { IInferTraitMethod } from '../internal/call/trait-method.infer';
import { IConstructor } from '../../../types/class/class-constructor.type';

/**
 * Calls target[methodName] if 'target' implements 'trait',
 * Else calls defaultImplementation.prototype[methodName]
 */
export function callTargetTraitMethodOrDefaultImplementation<GTrait, GMethodName extends (keyof GTrait)>(
  target: any,
  trait: IAbstractConstructor<GTrait>,
  methodName: GMethodName,
  args: Parameters<IInferTraitMethod<GTrait, GMethodName>>,
  defaultImplementation: IConstructor<GTrait> | IAbstractConstructor<GTrait>,
): ReturnType<IInferTraitMethod<GTrait, GMethodName>> {
  return callTargetTraitMethodOrDefaultFunction<GTrait, GMethodName>(
    target,
    trait,
    methodName,
    args,
    defaultImplementation.prototype[methodName],
  );
}
