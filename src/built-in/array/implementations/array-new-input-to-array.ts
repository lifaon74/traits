import { IArrayNewInput } from '../traits/new/array-new.function-definition';

export function arrayNewInputToArray<GValue>(
  input: IArrayNewInput<GValue>,
): GValue[] {
  if (Array.isArray(input)) {
    return input;
  } else {
    return Array.from(input);
  }
}
