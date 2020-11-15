import {
  GetOwnPropertyDescriptors,
  TGetOwnPropertyDescriptorsIteratorType,
} from '../../../core/object-helpers/object-get-own-property-descriptors';
import { DefineProperty } from '../../../core/object-helpers/object-define-property';
import { TCastToFunction } from './trait-as';

export interface TCastToConstructor<GSelf, GInstance> {
  new(input: GSelf): GInstance;
}

/**
 * ConstructorToFunction
 */
export function ctf<GSelf, GInstance>(ctor: TCastToConstructor<GSelf, GInstance>): TCastToFunction<GSelf, GInstance> {
  return (input: GSelf) => new ctor(input);
}

export function createReference<GData, GInstance extends GData>(data: GData, instance: GInstance): GInstance {
  const iterator: Iterator<TGetOwnPropertyDescriptorsIteratorType<GData>> = GetOwnPropertyDescriptors(data);
  let result: IteratorResult<TGetOwnPropertyDescriptorsIteratorType<GData>>;
  while (!(result = iterator.next()).done) {
    const [propertyKey, descriptor] = result.value;
    DefineProperty(result, propertyKey, {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      get: () => {
        return data[propertyKey];
      },
      set: (value: any) => {
        data[propertyKey] = value;
      },
    });
  }
  return instance;
}

export function ref<GSelf, GInstance extends GSelf>(ctor: TCastToConstructor<GSelf, GInstance>): TCastToFunction<GSelf, GInstance> {
  return (input: GSelf) => createReference<GSelf, GInstance>(input, new ctor(input) as GInstance);
}
