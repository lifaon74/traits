import { IGenericFunction } from '../../../../types';

/**
 * Structure to represent a method
 */
export interface IMethod {
  readonly propertyKey: PropertyKey,
  readonly descriptor: TypedPropertyDescriptor<IGenericFunction>;
}
