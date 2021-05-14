import { IConstructor } from '../../../../types/class/class-constructor.type';
import { implementTraitImplementation } from './implement-trait-implementation';
import { getImplementationDetailsOrThrow } from '../../../implementation/internal/get-implementation-details-or-throw';


/**
 * Applies an Implementation on 'target':
 *  - reflects the implementation's methods (including extended traits) on 'target'
 *  - marks 'target' as implementing 'traitImplementation'
 */
export function applyTraitImplementation(
  target: any,
  traitImplementation: IConstructor,
): void {
  implementTraitImplementation(
    target,
    getImplementationDetailsOrThrow(traitImplementation),
  );
}


