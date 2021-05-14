import { IImplementationDetails } from '../../../implementation/internal/implementations-map.constant';
import { implementTraitImplementationMethods } from './implement-trait-implementation-methods';
import { ANY_TO_IMPLEMENTATIONS_MAP } from './any-to-implementations-map.constant';


/**
 * Implements and register an Implementation on 'target'
 */
export function implementTraitImplementation(
  target: any,
  traitImplementation: IImplementationDetails,
): void {
  let implemented: Set<IImplementationDetails>;

  if (ANY_TO_IMPLEMENTATIONS_MAP.has(target)) {
    implemented = ANY_TO_IMPLEMENTATIONS_MAP.get(target) as Set<IImplementationDetails>;
  } else {
    implemented = new Set<IImplementationDetails>();
    ANY_TO_IMPLEMENTATIONS_MAP.set(target, implemented);
  }

  if (implemented.has(traitImplementation)) {
    throw new Error(`Implementation already applied for this target`);
  } else {
    implementTraitImplementationMethods(target, traitImplementation);
    implemented.add(traitImplementation);
  }
}
