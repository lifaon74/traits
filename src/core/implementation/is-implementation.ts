import { IConstructor } from '../../types/class/class-constructor.type';
import { IMPLEMENTATIONS_MAP } from './internal/implementations-map.constant';

/**
 * Returns true if 'value' is an Implementation
 */
export function isImpl<GImplementation extends IConstructor = IConstructor>(
  value: any,
): value is GImplementation {
  return IMPLEMENTATIONS_MAP.has(value);
}
