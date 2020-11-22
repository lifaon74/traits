import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';


@Trait()
export abstract class TraitEventListenerDispatchQueued<GSelf, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  abstract dispatchQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>,
  ): Promise<void>;
}


export type TGenericTraitEventListenerDispatchQueued = TraitEventListenerDispatchQueued<any, TGenericKeyValueTupleUnion>;

export type TInferTraitEventListenerDispatchQueuedGKeyValueTupleUnion<GTrait extends TGenericTraitEventListenerDispatchQueued> =
  GTrait extends TraitEventListenerDispatchQueued<any, infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

