import { ITraitDetails } from '../../trait/internal/traits-map.constant';
import { IConstructor } from '../../../types/class/class-constructor.type';
import { IMethod } from '../../helpers/internal/types/method.type';

/**
 * Structure which represents an Implementation
 */
export interface IImplementationDetails {
  readonly implementation: IConstructor,
  readonly ownMethods: readonly IMethod[];
  readonly forTrait: ITraitDetails;
}

// map from a implementation class to the details of this implementation
export const IMPLEMENTATIONS_MAP = new WeakMap<IConstructor, IImplementationDetails>();
