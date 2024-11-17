import { TupleToUnion } from './tuple-to-union.js';
import { UnionToIntersection } from './union-to-intersection.js';

export type TupleToIntersection<T extends readonly unknown[]> = UnionToIntersection<
  TupleToUnion<T>
>;
