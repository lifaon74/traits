export type IConstructor<GInstance = any, GArguments extends any[] = any[]> =
  new(...args: GArguments) => GInstance;

// export interface IConstructor<GInstance = any, GArguments extends any[] = any[]> {
//   new(...args: GArguments): GInstance;
// }
