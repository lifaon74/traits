import {
  TEventListenerOnUnsubscribe, TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion,
  TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../../../event-listener-types';
import { ITraitEventListenerOnceQueuedEmulatedGSelfConstraint } from '../trait-event-listener-once-queued-emulated';
import { EventListenerAwaitUntilNotDispatchingWithPromise } from '../../../helpers/event-listener-await-until-not-dispatching';


export function EventListenerOnceWithEmulatedQueuedUnsubscribe<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  target: ITraitEventListenerOnceQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion>,
  key: GKey,
  callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
): TEventListenerOnUnsubscribeQueued {
  let unsubscribePromise: Promise<void>;
  const unsubscribe: TEventListenerOnUnsubscribe = target.on<GKey>(key, (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => {
    if (unsubscribePromise === void 0) {
      unsubscribeQueued();
      callback(value);
    }
  });

  const unsubscribeQueued: TEventListenerOnUnsubscribeQueued = () => {
    if (unsubscribePromise === void 0) {
      unsubscribePromise = EventListenerAwaitUntilNotDispatchingWithPromise(target, unsubscribe);
    }
    return unsubscribePromise;
  };

  return unsubscribeQueued;
}


