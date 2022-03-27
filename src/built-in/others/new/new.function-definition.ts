export interface INewFunction<GArguments extends any[], GReturn> {
  (
    ...args: GArguments
  ): GReturn;
}

