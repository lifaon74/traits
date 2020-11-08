
import { ExtractTraitOrImplementationOwnMethods, IMethod } from './extract-trait-or-implementation-own-methods';
import { GetPrototypeOf } from '../object-helpers/object-get-prototype-of';
import { TAbstractClass } from '../types/class-types';

const GET_PROTOTYPE_OF_OBJECT = GetPrototypeOf(Object);

/**
 * Structure which represents a Trait
 */
export interface ITraitDetails {
  readonly trait: TAbstractClass,
  readonly ownMethods: readonly IMethod[];
  readonly parent: ITraitDetails | undefined;
}

// map from a trait class to the details of this trait
export const TRAITS = new WeakMap<TAbstractClass, ITraitDetails>();

/**
 * DECORATOR - for class
 * Registers an abstract class as a Trait
 */
export function Trait(): ClassDecorator {
  return (target: Function): void => {
    if (typeof target === 'function') {
      if (TRAITS.has(target)) {
        throw new Error(`@Trait<${ target.name }>: already registered as a trait`);
      } else {
        const parent: any = GetPrototypeOf(target);
        if (
          (parent === GET_PROTOTYPE_OF_OBJECT)
          || (parent === null)
          || TRAITS.has(parent)
        ) {
          TRAITS.set(target, Object.freeze({
            trait: target,
            ownMethods: ExtractTraitOrImplementationOwnMethods(target.prototype, `@Trait<${ target.name }>:`),
            parent: TRAITS.get(parent),
          }));
        } else {
          throw new Error(`@Trait<${ target.name }>: provided trait (class) must extends another trait or nothing`);
        }
      }
    } else {
      throw new TypeError(`@Trait: expects a class`);
    }
  };
}

/**
 * Returns true if 'input' is a Trait
 */
export function IsTrait<GTrait extends TAbstractClass = TAbstractClass>(input: any): input is GTrait {
  return TRAITS.has(input);
}
