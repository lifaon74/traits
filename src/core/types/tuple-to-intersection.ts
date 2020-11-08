import type { UnionToIntersection } from './union-to-intersection';
import type { TupleTypes } from './tuple-types';

export type TupleToIntersection<T> = UnionToIntersection<TupleTypes<T>>;
