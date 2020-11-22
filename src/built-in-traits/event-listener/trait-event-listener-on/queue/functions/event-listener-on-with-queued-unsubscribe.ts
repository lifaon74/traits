import {
  TEventListenerOnUnsubscribe, TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion,
  TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../../../event-listener-types';
import { QueueAsPromise } from '../../../../queue/helpers/queue-as-promise';
import { ITraitEventListenerOnQueuedUsingOnAndQueueGSelfConstraint } from '../trait-event-listener-on-queued-using-on-and-queue';


export function EventListenerOnWithQueuedUnsubscribe<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  target: ITraitEventListenerOnQueuedUsingOnAndQueueGSelfConstraint<GKeyValueTupleUnion>,
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
      unsubscribePromise = QueueAsPromise(target, unsubscribe);
    }
    return unsubscribePromise;
  };
}


