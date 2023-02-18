import { IEqualsTrait } from '../../equals/equals.trait';
import { INotEqualsFunction } from '../not-equals.function-definition';

export function createNotEqualsFunctionUsing$Equals$<GValue>(
  {
    equals,
  }: IEqualsTrait<GValue>,
): INotEqualsFunction<GValue> {
  return (value: GValue): boolean => {
    return !equals(value);
  };
}
