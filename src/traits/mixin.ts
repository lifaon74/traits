import { GenericAbstractClass } from '../misc/generic-abstract-class.js';
import { TupleToIntersection } from '../misc/tuple-to-intersection.js';

export type InferMixinResult<
  GImplementations extends readonly any[],
  GStaticImplementations extends readonly any[],
  GBaseClass extends GenericAbstractClass | undefined,
> = GImplementations extends []
  ? GStaticImplementations extends []
    ? GBaseClass extends undefined
      ? new () => {}
      : GBaseClass
    : GBaseClass extends undefined
      ? (new () => {}) & TupleToIntersection<GStaticImplementations>
      : GBaseClass & TupleToIntersection<GStaticImplementations>
  : GStaticImplementations extends []
    ? GBaseClass extends undefined
      ? new () => TupleToIntersection<GImplementations>
      : (new () => TupleToIntersection<GImplementations>) & GBaseClass
    : GBaseClass extends undefined
      ? (new () => TupleToIntersection<GImplementations>) &
          TupleToIntersection<GStaticImplementations>
      : (new () => TupleToIntersection<GImplementations>) &
          GBaseClass &
          TupleToIntersection<GStaticImplementations>;

export type MixinImplementationsInput<GImplementations extends readonly any[]> = {
  [GKey in keyof GImplementations]: abstract new () => GImplementations[GKey];
};

/*--*/

export function mixin<GImplementations extends readonly any[]>(
  implementations: MixinImplementationsInput<GImplementations>,
): InferMixinResult<GImplementations, [], undefined>;
export function mixin<
  GImplementations extends readonly any[],
  GStaticImplementations extends readonly any[],
>(
  implementations: MixinImplementationsInput<GImplementations>,
  staticImplementations: MixinImplementationsInput<GStaticImplementations>,
): InferMixinResult<GImplementations, GStaticImplementations, undefined>;
export function mixin<
  GImplementations extends readonly any[],
  GStaticImplementations extends readonly any[],
  GBaseClass extends GenericAbstractClass,
>(
  implementations: MixinImplementationsInput<GImplementations>,
  staticImplementations: MixinImplementationsInput<GStaticImplementations>,
  baseClass: GBaseClass,
): InferMixinResult<GImplementations, GStaticImplementations, GBaseClass>;
export function mixin<
  GImplementations extends readonly any[],
  GStaticImplementations extends readonly any[],
  GBaseClass extends GenericAbstractClass | undefined,
>(
  implementations: MixinImplementationsInput<GImplementations>,
  staticImplementations: MixinImplementationsInput<GStaticImplementations> | undefined = [] as any,
  baseClass?: GBaseClass | undefined,
): InferMixinResult<GImplementations, GStaticImplementations, GBaseClass> {
  const _class: any = baseClass === undefined ? class {} : class extends baseClass {};

  for (const implementation of implementations) {
    Object.defineProperties(
      _class.prototype,
      Object.getOwnPropertyDescriptors(implementation.prototype),
    );
  }

  for (const implementation of staticImplementations) {
    Object.defineProperties(_class, Object.getOwnPropertyDescriptors(implementation.prototype));
  }

  return _class;
}

/*--*/

// class A<T> {
//   a: T;
//   constructor(a: T) {
//     this.a = a;
//   }
// }
//
// class B<T> {
//   b!: string;
//   b_0!: T;
// }
//
// class C {
//   static c(): string {
//     return '';
//   }
//   c!: number;
// }
//
// class D extends C {
//   static c(): string {
//     return super.c();
//   }
//
//   d!: number;
// }
//
// // const IA = implement(C, A);
// //
// // const ia = new IA<string>('a');
//
// interface Opt<T> {
//   baseClass: typeof A;
//   implementations: [B<T>, C];
// }
//
// // const IB = mixin<[B<string>, C], typeof A>([B, C], A);
// const IB = mixin([B, C], A);
//
// const ib = new IB<string>('a');
