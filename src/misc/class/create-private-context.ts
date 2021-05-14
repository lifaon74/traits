import { objectDefineProperty } from '../object';

export function createPrivateContext<GContext>(
  _symbol: symbol,
  target: any,
  context: GContext
): GContext {
  objectDefineProperty(target, _symbol, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: context,
  });
  return context;
}
