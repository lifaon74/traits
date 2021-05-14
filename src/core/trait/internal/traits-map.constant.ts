import { IAbstractConstructor } from '../../../types/class/abstract-class-constructor.type';
import { IMethod } from '../../helpers/internal/types/method.type';

/**
 * Structure which represents a Trait
 */
export interface ITraitDetails {
  readonly trait: IAbstractConstructor,
  readonly ownMethods: readonly IMethod[];
  readonly parent: ITraitDetails | undefined;
}

// map from a trait class to the details of this trait
export const TRAITS_MAP = new WeakMap<IAbstractConstructor, ITraitDetails>();
