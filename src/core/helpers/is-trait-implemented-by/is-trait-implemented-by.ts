import { IAbstractConstructor } from '../../../types/class/abstract-class-constructor.type';
import { TRAITS_MAP } from '../../trait/internal/traits-map.constant';
import { ANY_TO_IMPLEMENTATIONS_MAP } from '../internal/apply/any-to-implementations-map.constant';
import { IImplementationDetails } from '../../implementation/internal/implementations-map.constant';
import { doesImplementationDetailsExtendTrait } from '../internal/is-extending/does-implementation-details-extend-trait';
import { objectGetPrototypeOf } from '../../../misc';


export type IWithImplementedTrait<GTarget, GTrait> = GTrait & GTarget;

/**
 * Returns true if 'trait' is implemented by 'target'
 */
export function isTraitImplementedBy<GTrait, GTarget>(
  trait: IAbstractConstructor<GTrait>,
  target: GTarget,
): target is IWithImplementedTrait<GTarget, GTrait> {
  if (TRAITS_MAP.has(trait)) {
    while (target !== null) {
      if (ANY_TO_IMPLEMENTATIONS_MAP.has(target)) {
        const implementedImplementations: Set<IImplementationDetails> = ANY_TO_IMPLEMENTATIONS_MAP.get(target) as Set<IImplementationDetails>;
        const iterator: Iterator<IImplementationDetails> = implementedImplementations.values();
        let result: IteratorResult<IImplementationDetails>;
        while (!(result = iterator.next()).done) {
          if (doesImplementationDetailsExtendTrait(result.value, trait)) {
            return true;
          }
        }
      }
      target = objectGetPrototypeOf(target);
    }
    return false;
  } else {
    throw new TypeError(`Provided 'trait' argument is not a trait`);
  }
}


