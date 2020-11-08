import { Trait } from '../../../core/traits/trait-decorator';
/*
trait Add<Rhs=Self> {
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}
 */

@Trait()
export abstract class TraitAdd<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}

export type TInferTraitAddGValue<GTrait extends TraitAdd<any, any, any>> =
  GTrait extends TraitAdd<any, infer GValue, any>
    ? GValue
    : never;

export type TInferTraitAddGReturn<GTrait extends TraitAdd<any, any, any>> =
  GTrait extends TraitAdd<any, any, infer GReturn>
    ? GReturn
    : never;
