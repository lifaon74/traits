import { IIteratorTraitCollection } from '../../iterator.trait-collection';

export interface IIteratorMapMapperFunction<GIn, GOut> {
  (
    value: GIn,
    index: number,
  ): GOut;
}


export interface IIteratorMapFunction<GIn, GOut, GReturn> {
  <GMapped>(
    mapper: IIteratorMapMapperFunction<GOut, GMapped>,
  ): IIteratorTraitCollection<GIn, GMapped, GReturn>;
}

