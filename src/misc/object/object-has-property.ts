/**
 * Returns true if 'target' has 'propertyKey' (follows prototype chain)
 */
export function objectHasProperty<GTarget, GPropertyKey extends PropertyKey>(
  target: GTarget,
  propertyKey: GPropertyKey,
): target is (GTarget & Record<GPropertyKey, any>) {
  return propertyKey in target;
}
