import { Trait } from '../../../core/traits/trait-decorator';


export type TCastToFunction<GSelf, GInstance> = (input: GSelf) => GInstance;

@Trait()
export abstract class TraitAs<GSelf> {
  as<GInstance>(this: GSelf, castTo: TCastToFunction<GSelf, GInstance>): GInstance {
    return castTo(this);
  }
}


// export interface TCastToFrom<GSelf, GInstance = unknown> {
//   from(input: GSelf): GInstance;
// }
//
// // export type TCastToFrom<GSelf, GInstance = unknown> = (input: GSelf) => GInstance;
//
// export interface TCastToConstructor<GSelf, GInstance = unknown> {
//   new(input: GSelf): GInstance;
// }
//
// export type TCastTo<GSelf, GInstance = unknown> = TCastToFrom<GSelf, GInstance> | TCastToConstructor<GSelf, GInstance>;
//
// export type TInferCastToInstance<GCastTo extends TCastTo<any>> =
//   GCastTo extends TCastToFrom<any, infer GInstance>
//     ? GInstance
//     : (
//       GCastTo extends TCastToConstructor<any, infer GInstance>
//         ? GInstance
//         : never
//       );
//
//
// export function IsCastToFrom<GSelf = unknown, GInstance = unknown>(value: any): value is TCastToFrom<GSelf, GInstance> {
//   return (typeof value.from === 'function');
// }
//
//
//
// @Trait()
// export abstract class TraitAs<GSelf> {
//   as<GInstance>(this: GSelf, castTo: TCastTo<GInstance>): GInstance {
//     return (
//       IsCastToFrom<GSelf, GInstance>(castTo)
//         ? castTo.from(this)
//         : new (castTo as unknown as TCastToConstructor<GSelf, GInstance>)(this)
//     ) as GInstance;
//   }
// }

// export interface TCastToFrom<GSelf, GInstance = unknown> {
//   from(input: GSelf): GInstance;
// }
//
// export interface TCastToConstructor<GSelf, GInstance = unknown> {
//   new(input: GSelf): GInstance;
// }
//
// export type TCastTo<GSelf, GInstance = unknown> = TCastToFrom<GSelf, GInstance> | TCastToConstructor<GSelf, GInstance>;
//
// export type TInferCastToInstance<GCastTo extends TCastTo<any>> =
//   GCastTo extends TCastToFrom<any, infer GInstance>
//     ? GInstance
//     : (
//       GCastTo extends TCastToConstructor<any, infer GInstance>
//         ? GInstance
//         : never
//       );
//
//
// export function IsCastToFrom<GSelf = unknown, GInstance = unknown>(value: any): value is TCastToFrom<GSelf, GInstance> {
//   return (typeof value.from === 'function');
// }
//
//
//
// @Trait()
// export abstract class TraitAs<GSelf> {
//   as<GInstance>(this: GSelf, castTo: TCastTo<GInstance>): GInstance {
//     return (
//       IsCastToFrom<GSelf, GInstance>(castTo)
//         ? castTo.from(this)
//         : new (castTo as unknown as TCastToConstructor<GSelf, GInstance>)(this)
//     ) as GInstance;
//   }
// }


// export interface TCastToFrom<GSelf, GInstance = unknown> {
//   from(input: GSelf): GInstance;
// }
//
// export interface TCastToConstructor<GSelf, GInstance = unknown> {
//   new(input: GSelf): GInstance;
// }
//
// export type TCastTo<GSelf> = TCastToFrom<GSelf> | TCastToConstructor<GSelf>;
//
// export type TInferCastToInstance<GCastTo extends TCastTo<any>> =
//   GCastTo extends TCastToFrom<any, infer GInstance>
//     ? GInstance
//     : (
//       GCastTo extends TCastToConstructor<any, infer GInstance>
//         ? GInstance
//         : never
//       );
//
//
// export function IsCastToFrom<GSelf = unknown, GInstance = unknown>(value: any): value is TCastToFrom<GSelf, GInstance> {
//   return (typeof value.from === 'function');
// }
//
//
// @Trait()
// export abstract class TraitAs<GSelf> {
//   as<GCastTo extends TCastTo<GSelf>>(this: GSelf, castTo: GCastTo): TInferCastToInstance<GCastTo> {
//     return (
//       IsCastToFrom(castTo)
//         ? castTo.from(this)
//         : new (castTo as TCastToConstructor<GSelf>)(this)
//     ) as TInferCastToInstance<GCastTo>;
//   }
// }

