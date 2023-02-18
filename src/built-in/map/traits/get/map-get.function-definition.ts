export interface IMapGetFunction<GKey, GValue> {
  (
    key: GKey,
  ): GValue | undefined;
}
