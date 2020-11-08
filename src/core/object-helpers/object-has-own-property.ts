
/**
 * Returns true if 'target' has 'propertyKey' as own property
 */
export function HasOwnProperty<GTarget, GPropertyKey extends PropertyKey>(
  target: GTarget,
  propertyKey: GPropertyKey,
): target is (GTarget & Record<GPropertyKey, any>) {
  return Object.prototype.hasOwnProperty.call(target, propertyKey);
}
