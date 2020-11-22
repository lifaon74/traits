import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';


@Trait()
export abstract class TraitEventListenerOnceQueued<GSelf, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  abstract onceQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): Promise<TEventListenerOnUnsubscribeQueued>;
}


export type TGenericTraitEventListenerOnceQueued = TraitEventListenerOnceQueued<any, TGenericKeyValueTupleUnion>;

export type TInferTraitEventListenerOnceQueuedGKeyValueTupleUnion<GTrait extends TGenericTraitEventListenerOnceQueued> =
  GTrait extends TraitEventListenerOnceQueued<any, infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

