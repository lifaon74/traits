import { ExtractTraitOrImplementationOwnMethods, IMethod } from './extract-trait-or-implementation-own-methods';
import { ITraitDetails, TRAITS } from './trait-decorator';
import { TConstructor } from '../types/class-types';
import { GetPrototypeOf } from '../object-helpers/object-get-prototype-of';

/**
 * Structure which represents an Implementation
 */
export interface IImplementationDetails {
  readonly implementation: Function,
  readonly ownMethods: readonly IMethod[];
  readonly forTrait: ITraitDetails;
}

// map from a implementation class to the details of this implementation
export const IMPLEMENTATIONS = new WeakMap<Function, IImplementationDetails>();

/**
 * DECORATOR - for class
 * Registers a class as an Implementation
 */
export function Impl(): ClassDecorator {
  return (target: Function): void => {
    if (typeof target === 'function') {
      if (IMPLEMENTATIONS.has(target)) {
        throw new Error(`@Impl<${ target.name }>: already registered as an implementation`);
      } else {
        const trait = GetPrototypeOf(target);
        if (TRAITS.has(trait)) {
          IMPLEMENTATIONS.set(target, Object.freeze({
            implementation: target,
            ownMethods: ExtractTraitOrImplementationOwnMethods(target.prototype, `@Impl<${ target.name }>:`),
            forTrait: TRAITS.get(trait) as ITraitDetails,
          }));
        } else {
          throw new Error(`@Impl<${ target.name }>: the implementation is not extending a trait`);
        }
      }
    } else {
      throw new TypeError(`@Impl: expects a class`);
    }
  };
}

/**
 * Returns true if 'input' is an Implementation
 */
export function IsImpl<GImplementation extends TConstructor = TConstructor>(input: any): input is GImplementation {
  return IMPLEMENTATIONS.has(input);
}
