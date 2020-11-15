import { TRAITS } from './trait-decorator';
import { IImplementationDetails } from './implementation-decorator';
import { ANY_TO_IMPLEMENTATIONS_MAP } from './apply-trait-implementation';
import { TupleToIntersection } from '../types/tuple-to-intersection';
import { GetPrototypeOf } from '../object-helpers/object-get-prototype-of';
import { TAbstractClass } from '../types/class-types';
import { ImplementationDetailsExtendsTrait } from './implementation-details-extends-trait';


export type TWithImplementedTrait<GTarget, GTrait> = GTrait & GTarget;

/**
 * Returns true if 'trait' is implemented by 'target'
 */
export function TraitIsImplementedBy<GTrait, GTarget>(
  trait: TAbstractClass<GTrait>,
  target: GTarget,
): target is TWithImplementedTrait<GTarget, GTrait> {
  if (TRAITS.has(trait)) {
    while (target !== null) {
      if (ANY_TO_IMPLEMENTATIONS_MAP.has(target)) {
        const implementedImplementations: Set<IImplementationDetails> = ANY_TO_IMPLEMENTATIONS_MAP.get(target) as Set<IImplementationDetails>;
        const iterator: Iterator<IImplementationDetails> = implementedImplementations.values();
        let result: IteratorResult<IImplementationDetails>;
        while (!(result = iterator.next()).done) {
          if (ImplementationDetailsExtendsTrait(result.value, trait)) {
            return true;
          }
        }
      }
      target = GetPrototypeOf(target);
    }
    return false;
  } else {
    throw new TypeError(`Provided 'trait' argument is not a trait`);
  }
}


/*--*/


export type TWithImplementedTraits<GTarget, GTraits extends any[]> = TupleToIntersection<GTraits> & GTarget;

/**
 * Returns true if all the 'traits' are implemented by 'target'
 */
export function TraitsAreImplementedBy<GTraits extends any[], GTarget>(
  traits: { [GKey in keyof GTraits]: TAbstractClass<GTraits[GKey]> },
  target: GTarget,
): target is TWithImplementedTraits<GTarget, GTraits> {
  return traits.every((trait: TAbstractClass<any>) => {
    return TraitIsImplementedBy(trait, target);
  });
}
