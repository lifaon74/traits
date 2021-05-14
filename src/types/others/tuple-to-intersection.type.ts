import type { UnionToIntersection } from './union-to-intersection';
import type { TupleTypes } from './tuple-types.type';

export type TupleToIntersection<T> = UnionToIntersection<TupleTypes<T>>;
