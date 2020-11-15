import { Trait } from '../../../core/traits/trait-decorator';

import {
  TEventListenerOnUnsubscribe, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey
} from '../event-listener-types';

@Trait()
export abstract class TraitEventListenerOnce<GSelf, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  abstract once<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): TEventListenerOnUnsubscribe;
}

export type TGenericTraitEventListenerOnce = TraitEventListenerOnce<any, TGenericKeyValueTupleUnion>;

export type TInferTraitEventListenerOnceGKeyValueTupleUnion<GTrait extends TGenericTraitEventListenerOnce> =
  GTrait extends TraitEventListenerOnce<any, infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

