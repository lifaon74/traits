export function objectFreeze<GItem>(
  target: GItem[],
): readonly GItem[];
export function objectFreeze<GFunction extends Function>(
  target: GFunction,
): GFunction;
export function objectFreeze<GTarget>(
  target: GTarget,
): Readonly<GTarget>;
export function objectFreeze<GTarget>(
  target: GTarget,
): Readonly<GTarget> {
  return Object.freeze<GTarget>(target);
}

