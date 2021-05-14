import { TupleToIntersection } from '../../../types';
import { IAbstractConstructor } from '../../../types/class/abstract-class-constructor.type';
import { traitIsImplementedBy } from '../trait-is-implemented-by';


export type IWithImplementedTraits<GTarget, GTraits extends any[]> = TupleToIntersection<GTraits> & GTarget;

/**
 * Returns true if all the 'traits' are implemented by 'target'
 */
export function traitsAreImplementedBy<GTraits extends any[], GTarget>(
  traits: { [GKey in keyof GTraits]: IAbstractConstructor<GTraits[GKey]> },
  target: GTarget,
): target is IWithImplementedTraits<GTarget, GTraits> {
  return traits.every((trait: IAbstractConstructor<any>): boolean => {
    return traitIsImplementedBy(trait, target);
  });
}
