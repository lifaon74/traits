export interface IMapSetFunction<GKey, GValue> {
  (
    key: GKey,
    value: GValue,
  ): void;
}
