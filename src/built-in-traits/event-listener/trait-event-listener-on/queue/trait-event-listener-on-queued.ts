import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';


@Trait()
export abstract class TraitEventListenerOnQueued<GSelf, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  abstract onQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): Promise<TEventListenerOnUnsubscribeQueued>;
}


export type TGenericTraitEventListenerOnQueued = TraitEventListenerOnQueued<any, TGenericKeyValueTupleUnion>;

export type TInferTraitEventListenerOnQueuedGKeyValueTupleUnion<GTrait extends TGenericTraitEventListenerOnQueued> =
  GTrait extends TraitEventListenerOnQueued<any, infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

