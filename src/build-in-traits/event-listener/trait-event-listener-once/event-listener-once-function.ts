import {
  TEventListenerOnUnsubscribe, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey
} from '../event-listener-types';
import { TraitEventListenerOn } from '../trait-event-listener-on/trait-event-listener-on';

export function EventListenerOnce<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  eventListener: TraitEventListenerOn<any, GKeyValueTupleUnion>,
  key: GKey,
  callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
): TEventListenerOnUnsubscribe {
  const unsubscribe: TEventListenerOnUnsubscribe = eventListener.on<GKey>(key, (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => {
    unsubscribe();
    callback(value);
  });
  return unsubscribe;
}
