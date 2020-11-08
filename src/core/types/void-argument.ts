export type VoidArgument<GValue> =
  GValue extends void
    ? [GValue?]
    : [GValue];

// type A = [1, ...VoidArgument<void>, ...VoidArgument<void>, 5]
