import { TRAITS_MAP } from './internal/traits-map.constant';
import { IAbstractConstructor } from '../../types/class/abstract-class-constructor.type';
import { objectFreeze, objectGetPrototypeOf } from '../../misc';
import { extractTraitOrImplementationOwnMethods } from '../helpers/internal/extract/extract-trait-or-implementation-own-methods';

const GET_PROTOTYPE_OF_OBJECT = objectGetPrototypeOf(Object);

/**
 * DECORATOR - for class
 * Registers an abstract class as a Trait
 */
export function Trait(): ClassDecorator {
  return ((target: IAbstractConstructor): void => {
    if (typeof target === 'function') {
      if (TRAITS_MAP.has(target)) {
        throw new Error(`@Trait<${ target.name }>: already registered as a trait`);
      } else {
        const parent: any = objectGetPrototypeOf(target);
        if (
          (parent === GET_PROTOTYPE_OF_OBJECT)
          || (parent === null)
          || TRAITS_MAP.has(parent)
        ) {
          TRAITS_MAP.set(target, objectFreeze({
            trait: target,
            ownMethods: extractTraitOrImplementationOwnMethods(target.prototype, `@Trait<${ target.name }>:`),
            parent: TRAITS_MAP.get(parent),
          }));
        } else {
          throw new Error(`@Trait<${ target.name }>: provided trait (class) must extends another trait or nothing`);
        }
      }
    } else {
      throw new TypeError(`@Trait: expects a class`);
    }
  }) as ClassDecorator;
}
