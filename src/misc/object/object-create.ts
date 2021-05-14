export function objectCreate<GObject>(
  proto: object | null,
  properties?: PropertyDescriptorMap,
): GObject {
  return Object.create(proto, properties as any);
}

