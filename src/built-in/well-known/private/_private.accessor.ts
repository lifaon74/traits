import { PRIVATE } from './private.constant.js';
import { PrivateTrait } from './private.trait.js';

export function _private<GPrivate extends object>(instance: PrivateTrait<GPrivate>): GPrivate {
  return instance[PRIVATE];
}
