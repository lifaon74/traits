// converts a tuple type (ex: [number, string]) to an union of types => 'number' | 'string'
export type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never; // type A = TupleTypes<[1, "hello", true]>; // === 1 | "hello" | true
