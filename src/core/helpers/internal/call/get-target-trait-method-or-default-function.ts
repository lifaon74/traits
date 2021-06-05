import { IInferTraitMethod } from './trait-method.infer';
import { IAbstractConstructor } from '../../../../types/class/abstract-class-constructor.type';
import { isTraitImplementedBy } from '../../is-trait-implemented-by';


/**
 * If 'target' implements 'trait', returns target's implementation (target[methodName])
 * Else, returns a 'defaultFunction'
 */
export function getTargetTraitMethodOrDefaultFunction<GTrait, GMethodName extends (keyof GTrait)>(
  target: any,
  trait: IAbstractConstructor<GTrait>,
  methodName: GMethodName,
  defaultFunction: IInferTraitMethod<GTrait, GMethodName>,
): IInferTraitMethod<GTrait, GMethodName> {
  return isTraitImplementedBy<GTrait, any>(trait, target)
    ? target[methodName]
    : defaultFunction;
}
