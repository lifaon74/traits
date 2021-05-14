export type IObjectAssignResult<GTarget, GSource> = GTarget & GSource;

export function objectAssign<GTarget, GSource>(
  target: GTarget,
  source: GSource,
): IObjectAssignResult<GTarget, GSource> {
  return Object.assign<GTarget, GSource>(target, source);
}

