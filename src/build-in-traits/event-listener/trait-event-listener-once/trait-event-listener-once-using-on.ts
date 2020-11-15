import { Trait } from '../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribe, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../event-listener-types';
import { TraitEventListenerOn } from '../trait-event-listener-on/trait-event-listener-on';
import { EventListenerOnce } from './event-listener-once-function';
import { TraitEventListenerOnce } from './trait-event-listener-once';

@Trait()
export abstract class TraitEventListenerOnceUsingOn<GSelf extends TraitEventListenerOn<any, GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOnce<GSelf, GKeyValueTupleUnion> {
  once<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): TEventListenerOnUnsubscribe {
    return EventListenerOnce<GKeyValueTupleUnion, GKey>(this, key, callback);
  }
}
