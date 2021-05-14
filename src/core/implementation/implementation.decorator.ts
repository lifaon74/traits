import { IMPLEMENTATIONS_MAP } from './internal/implementations-map.constant';
import { ITraitDetails, TRAITS_MAP } from '../trait/internal/traits-map.constant';
import { objectFreeze, objectGetPrototypeOf } from '../../misc';
import { IConstructor } from '../../types/class/class-constructor.type';
import { extractTraitOrImplementationOwnMethods } from '../helpers/internal/extract/extract-trait-or-implementation-own-methods';

/**
 * DECORATOR - for class
 * Registers a class as an Implementation
 */
export function Impl(): ClassDecorator {
  return ((target: IConstructor): void => {
    if (typeof target === 'function') {
      if (IMPLEMENTATIONS_MAP.has(target)) {
        throw new Error(`@Impl<${ target.name }>: already registered as an implementation`);
      } else {
        const trait: any = objectGetPrototypeOf(target);
        if (TRAITS_MAP.has(trait)) {
          IMPLEMENTATIONS_MAP.set(target, objectFreeze({
            implementation: target,
            ownMethods: extractTraitOrImplementationOwnMethods(target.prototype, `@Impl<${ target.name }>:`),
            forTrait: TRAITS_MAP.get(trait) as ITraitDetails,
          }));
        } else {
          throw new Error(`@Impl<${ target.name }>: the implementation is not extending a trait`);
        }
      }
    } else {
      throw new TypeError(`@Impl: expects a class`);
    }
  }) as ClassDecorator;
}


