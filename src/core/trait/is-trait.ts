import { TRAITS_MAP } from './internal/traits-map.constant';
import { IAbstractConstructor } from '../../types/class/abstract-class-constructor.type';


/**
 * Returns true if 'value' is a Trait
 */
export function isTrait<GTrait extends IAbstractConstructor = IAbstractConstructor>(
  value: any,
): value is GTrait {
  return TRAITS_MAP.has(value);
}
