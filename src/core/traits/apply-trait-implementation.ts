import { IImplementationDetails, IMPLEMENTATIONS } from './implementation-decorator';
import { ImplementationExtendsTrait } from './trait-is-implemented-by';
import { IMethod } from './extract-trait-or-implementation-own-methods';
import { ITraitDetails } from './trait-decorator';
import { TConstructor } from '../types/class-types';
import { HasProperty } from '../object-helpers/object-has-property';
import { DefineProperty } from '../object-helpers/object-define-property';


/**
 * Implements a method on target.
 *  - skips implementation if method has already been implemented from 'implementedProperties'
 *  - else, throws if method is already implemented on 'target'
 */
function ImplementMethod(
  target: any,
  method: IMethod,
  implementedProperties: Set<PropertyKey>,
): void {
  const propertyKey: PropertyKey = method.propertyKey;
  if (!implementedProperties.has(propertyKey)) {
    if (
      HasProperty(target, propertyKey)
      && (target[propertyKey] !== Object.prototype[propertyKey])
    ) {
      throw new Error(`The property '${ String(propertyKey) }' is already defined`);
    } else {
      DefineProperty(target, propertyKey, method.descriptor);
      implementedProperties.add(propertyKey);
    }
  }
}




/**
 * Implements a Trait on 'target':
 *  - reflects the trait's methods (including parents) on 'target'
 */
function ImplementTrait(
  target: any,
  trait: ITraitDetails | undefined,
  implementedProperties: Set<PropertyKey>,
): void {
  while (trait !== void 0) {
    const ownMethods: readonly IMethod[] = trait.ownMethods;
    for (let i = 0, l = ownMethods.length; i < l; i++) {
      ImplementMethod(
        target,
        ownMethods[i],
        implementedProperties,
      );
    }
    trait = trait.parent;
  }
}

/**
 * Implements the own methods of an Implementation on 'target'
 */
function ImplementTraitImplementationOwnMethods(
  target: any,
  traitImplementation: IImplementationDetails,
  implementedProperties: Set<PropertyKey>,
): void {
  const ownMethods: readonly IMethod[] = traitImplementation.ownMethods;
  for (let i = 0, l = ownMethods.length; i < l; i++) {
    ImplementMethod(
      target,
      ownMethods[i],
      implementedProperties,
    );
  }
}

/**
 * Implements the own methods of an Implementation on 'target', and its extended trait methods
 */
function ImplementTraitImplementationMethods(
  target: any,
  traitImplementation: IImplementationDetails,
): void {
  const implementedProperties: Set<PropertyKey> = new Set<PropertyKey>();
  ImplementTraitImplementationOwnMethods(
    target,
    traitImplementation,
    implementedProperties,
  );

  ImplementTrait(
    target,
    traitImplementation.forTrait,
    implementedProperties
  );
}


// map from a variable to the list of its implementations
export const ANY_TO_IMPLEMENTATIONS_MAP = new WeakMap<any, Set<IImplementationDetails>>();

/**
 * Implements and register an Implementation on 'target'
 */
function ImplementTraitImplementation(
  target: any,
  traitImplementation: IImplementationDetails,
): void {
  let implemented: Set<IImplementationDetails>;

  if (ANY_TO_IMPLEMENTATIONS_MAP.has(target)) {
    implemented = ANY_TO_IMPLEMENTATIONS_MAP.get(target) as Set<IImplementationDetails>;
  } else {
    implemented = new Set<IImplementationDetails>();
    ANY_TO_IMPLEMENTATIONS_MAP.set(target, implemented);
  }

  if (implemented.has(traitImplementation)) {
    throw new Error(`Implementation already applied for this target`);
  } else {
    ImplementTraitImplementationMethods(target, traitImplementation);
    implemented.add(traitImplementation);
  }
}


function GenerateNotAndImplementationErrorMessage(traitImplementation: TConstructor): string {
  return `'${ traitImplementation.name }' is not an implementation. Did you forgot the decorator @Impl() ?`;
}

function GetImplementationDetailsOrThrow(
  traitImplementation: TConstructor,
): IImplementationDetails {
  if (IMPLEMENTATIONS.has(traitImplementation)) {
    return IMPLEMENTATIONS.get(traitImplementation) as IImplementationDetails;
  } else {
    throw new Error(GenerateNotAndImplementationErrorMessage(traitImplementation));
  }
}

function GetManyImplementationDetails(
  traitImplementations: TImplementationsCollection,
): IImplementationDetails[] {
  return traitImplementations
    .map((traitImplementation: TConstructor) => {
      return GetImplementationDetailsOrThrow(traitImplementation);
    });
}


export type TImplementationsCollection = readonly TConstructor[];

/**
 * Applies an Implementation on 'target':
 *  - reflects the implementation's methods (including extended traits) on 'target'
 *  - marks 'target' as implementing 'traitImplementation'
 */
export function ApplyTraitImplementation(
  target: any,
  traitImplementation: TConstructor,
): void {
  ImplementTraitImplementation(
    target,
    GetImplementationDetailsOrThrow(traitImplementation),
  );
}

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


/**
 * Removes from 'traitImplementations' (without modifying the original array) all implementations overridden (sharing similar traits) by 'newTraitImplementations'
 * and appends (concat) 'newTraitImplementations'
 * This is useful, if you want to create a class which implements some Implementations from another, and override some of them.
 */
export function OverrideTraitImplementations(
  traitImplementations: TImplementationsCollection,
  newTraitImplementations: TImplementationsCollection,
): TImplementationsCollection {
  const newTraitImplementationsDetails: IImplementationDetails[] = GetManyImplementationDetails(newTraitImplementations);
  return traitImplementations
    .filter((traitImplementation: TConstructor) => {
      const traitImplementationDetails: IImplementationDetails = GetImplementationDetailsOrThrow(traitImplementation);
      return newTraitImplementationsDetails
        .every((newTraitImplementationDetails: IImplementationDetails) => {
          return !ImplementationExtendsTrait(traitImplementationDetails, newTraitImplementationDetails.forTrait.trait);
        });
    })
    .concat(newTraitImplementations);
}
