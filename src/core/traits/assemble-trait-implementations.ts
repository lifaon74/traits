import { TConstructor } from '../types/class-types';
import { ApplyTraitImplementation, TImplementationsCollection } from './apply-trait-implementation';

/**
 * Creates a new class which implements many Implementations
 */
export function AssembleTraitImplementations<GAssembledImplementations extends TConstructor>(
  traitImplementations: TImplementationsCollection,
  baseClass?: TConstructor,
): GAssembledImplementations {
  const _class: any = (baseClass === void 0)
    ? class Impl {
    }
    : class Impl extends baseClass {
    };

  for (let i = 0, l = traitImplementations.length; i < l; i++) {
    const traitImplementation: TConstructor = traitImplementations[i];
    ApplyTraitImplementation(_class.prototype, traitImplementation);
  }

  return _class;
}
