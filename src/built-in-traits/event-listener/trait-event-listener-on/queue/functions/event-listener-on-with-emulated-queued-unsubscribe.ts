import {
  TEventListenerOnUnsubscribe, TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion,
  TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../../../event-listener-types';
import { ITraitEventListenerOnQueuedEmulatedGSelfConstraint } from '../trait-event-listener-on-queued-emulated';
import { EventListenerAwaitUntilNotDispatchingWithPromise } from '../../../helpers/event-listener-await-until-not-dispatching';


export function EventListenerOnWithEmulatedQueuedUnsubscribe<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  target: ITraitEventListenerOnQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion>,
  key: GKey,
  callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
): TEventListenerOnUnsubscribeQueued {
  let unsubscribePromise: Promise<void>;
  const unsubscribe: TEventListenerOnUnsubscribe = target.on<GKey>(key, (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => {
    if (unsubscribePromise === void 0) {
      callback(value);
    }
  });
  return () => {
    if (unsubscribePromise === void 0) {
      unsubscribePromise = EventListenerAwaitUntilNotDispatchingWithPromise<void>(target, unsubscribe);
    }
    return unsubscribePromise;
  };
}


