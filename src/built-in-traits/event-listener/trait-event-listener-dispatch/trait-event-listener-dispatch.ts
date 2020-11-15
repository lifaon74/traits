import { Trait } from '../../../core/traits/trait-decorator';
import {
  TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey
} from '../event-listener-types';

@Trait()
export abstract class TraitEventListenerDispatch<GSelf, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  abstract dispatch<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>,
  ): void;
}

export type TGenericTraitEventListenerDispatch = TraitEventListenerDispatch<any, TGenericKeyValueTupleUnion>;

export type TInferTraitEventListenerDispatchGKeyValueTupleUnion<GTrait extends TGenericTraitEventListenerDispatch> =
  GTrait extends TraitEventListenerDispatch<any, infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;
