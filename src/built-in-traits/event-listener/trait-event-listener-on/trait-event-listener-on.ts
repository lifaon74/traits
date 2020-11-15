import { Trait } from '../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribe, TGenericKeyValueTupleUnion,
  TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../event-listener-types';


@Trait()
export abstract class TraitEventListenerOn<GSelf, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  abstract on<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): TEventListenerOnUnsubscribe;
}


export type TGenericTraitEventListenerOn = TraitEventListenerOn<any, TGenericKeyValueTupleUnion>;

export type TInferTraitEventListenerOnGKeyValueTupleUnion<GTrait extends TGenericTraitEventListenerOn> =
  GTrait extends TraitEventListenerOn<any, infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

