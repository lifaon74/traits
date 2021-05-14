import { IConstructor } from '../../../types/class/class-constructor.type';
import { IImplementationsCollection } from '../../implementation/internal/get-many-implementation-details';
import { applyTraitImplementation } from '../internal/apply/apply-trait-implementation';

/**
 * Creates a new class which implements many Implementations
 */
export function assembleTraitImplementations<GAssembledImplementations extends IConstructor>(
  traitImplementationsForPrototype: IImplementationsCollection,
  traitImplementationsForStaticClass: IImplementationsCollection = [],
  baseClass?: IConstructor,
): GAssembledImplementations {
  const _class: any = (baseClass === void 0)
    ? class Impl {
    }
    : class Impl extends baseClass {
    };

  for (let i = 0, l = traitImplementationsForPrototype.length; i < l; i++) {
    applyTraitImplementation(_class.prototype, traitImplementationsForPrototype[i]);
  }

  for (let i = 0, l = traitImplementationsForStaticClass.length; i < l; i++) {
    applyTraitImplementation(_class, traitImplementationsForStaticClass[i]);
  }

  return _class;
}
