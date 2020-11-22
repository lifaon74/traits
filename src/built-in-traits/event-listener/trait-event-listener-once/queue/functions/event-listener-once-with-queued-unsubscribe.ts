import {
  TEventListenerOnUnsubscribe, TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion,
  TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../../../event-listener-types';
import { ITraitEventListenerOnceQueuedEmulatedGSelfConstraint } from '../trait-event-listener-once-queued-emulated';
import { EventListenerAwaitUntilNotDispatchingWithPromise } from '../../../helpers/event-listener-await-until-not-dispatching';
import { ITraitEventListenerOnceQueuedUsingOnAndQueueGSelfConstraint } from '../trait-event-listener-once-queued-using-on-and-queue';
import { QueueAsPromise } from '../../../../queue/helpers/queue-as-promise';


export function EventListenerOnceWithQueuedUnsubscribe<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  target: ITraitEventListenerOnceQueuedUsingOnAndQueueGSelfConstraint<GKeyValueTupleUnion>,
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
      unsubscribePromise = QueueAsPromise(target, unsubscribe);
    }
    return unsubscribePromise;
  };

  return unsubscribeQueued;
}


