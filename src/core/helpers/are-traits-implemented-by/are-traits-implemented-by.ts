import { TupleToIntersection } from '../../../types';
import { IAbstractConstructor } from '../../../types/class/abstract-class-constructor.type';
import { isTraitImplementedBy } from '../is-trait-implemented-by';


export type IWithImplementedTraits<GTarget, GTraits extends any[]> = TupleToIntersection<GTraits> & GTarget;

/**
 * Returns true if all the 'traits' are implemented by 'target'
 */
export function areTraitsImplementedBy<GTraits extends any[], GTarget>(
  traits: { [GKey in keyof GTraits]: IAbstractConstructor<GTraits[GKey]> },
  target: GTarget,
): target is IWithImplementedTraits<GTarget, GTraits> {
  return traits.every((trait: IAbstractConstructor<any>): boolean => {
    return isTraitImplementedBy(trait, target);
  });
}
