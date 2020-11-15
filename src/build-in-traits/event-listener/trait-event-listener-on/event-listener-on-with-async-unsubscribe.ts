import {
  TEventListenerOnUnsubscribe, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey
} from '../event-listener-types';
import { TraitEventListenerOn } from './trait-event-listener-on';
import { EventListenerAwaitUntilNotDispatchingWithPromise } from '../helpers/event-listener-await-until-not-dispatching';
import { TraitEventListenerIsDispatching } from '../trait-event-listener-is-dispatching/trait-event-listener-is-dispatching';

export type TEventListenerOnUnsubscribeAsync = () => Promise<void>;


export interface IEventListenerOnWithAsyncUnsubscribeEventListener<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOn<any, GKeyValueTupleUnion>, TraitEventListenerIsDispatching<any> {
}

/**
 * Calls 'target.on' method and wraps the result (unsubscribe function) in such a way that calling this unsubscribe function
 * will await until any dispatching is finished.
 */
export function EventListenerOnWithAsyncUnsubscribe<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  eventListener: IEventListenerOnWithAsyncUnsubscribeEventListener<GKeyValueTupleUnion>,
  key: GKey,
  callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
): TEventListenerOnUnsubscribeAsync {
  let unsubscribePromise: Promise<void>;
  const unsubscribe: TEventListenerOnUnsubscribe = eventListener.on<GKey>(key, (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => {
    if (unsubscribePromise === void 0) {
      callback(value);
    }
  });
  return () => {
    if (unsubscribePromise === void 0) {
      unsubscribePromise = EventListenerAwaitUntilNotDispatchingWithPromise(eventListener, unsubscribe);
    }
    return unsubscribePromise;
  };
}


// export function EventListenerOnWithAsyncUnsubscribe<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
//   eventListener: TraitEventListenerOn<any, GKeyValueTupleUnion>,
//   key: GKey,
//   callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
// ): TEventListenerOnUnsubscribeAsync {
//   let unsubscribePromise: Promise<void>;
//   const unsubscribe: TEventListenerOnUnsubscribe = eventListener.on<GKey>(key, (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => {
//     if (unsubscribePromise === void 0) {
//       callback(value);
//     }
//   });
//   return () => {
//     if (unsubscribePromise === void 0) {
//       if (TraitIsImplementedBy(TraitEventListenerIsDispatching, eventListener)) {
//         unsubscribePromise = EventListenerAwaitUntilNotDispatchingWithPromise(eventListener, unsubscribe);
//       } else {
//         unsubscribePromise = new Promise(resolve => resolve(unsubscribe()))
//       }
//     }
//     return unsubscribePromise;
//   };
// }
