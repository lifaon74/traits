import { TConstructor } from '../types/class-types';
import { ApplyTraitImplementation, TImplementationsCollection } from './apply-trait-implementation';

/**
 * Creates a new class which implements many Implementations
 */
export function AssembleTraitImplementations<GAssembledImplementations extends TConstructor>(
  traitImplementationsForPrototype: TImplementationsCollection,
  traitImplementationsForStaticClass: TImplementationsCollection = [],
  baseClass?: TConstructor,
): GAssembledImplementations {
  const _class: any = (baseClass === void 0)
    ? class Impl {
    }
    : class Impl extends baseClass {
    };

  for (let i = 0, l = traitImplementationsForPrototype.length; i < l; i++) {
    ApplyTraitImplementation(_class.prototype, traitImplementationsForPrototype[i]);
  }

  for (let i = 0, l = traitImplementationsForStaticClass.length; i < l; i++) {
    ApplyTraitImplementation(_class, traitImplementationsForStaticClass[i]);
  }

  return _class;
}
