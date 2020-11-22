import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';
import { TraitEventListenerOn } from '../trait-event-listener-on';
import { TraitQueue } from '../../../queue/trait-queue/trait-queue';
import { QueueAsPromise } from '../../../queue/helpers/queue-as-promise';
import { EventListenerOnWithQueuedUnsubscribe } from './functions/event-listener-on-with-queued-unsubscribe';

export interface ITraitEventListenerOnQueuedUsingOnAndQueueGSelfConstraint<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOn<any, GKeyValueTupleUnion>,
  TraitQueue<any> {
}

@Trait()
export abstract class TraitEventListenerOnQueuedUsingOnAndQueue<GSelf extends ITraitEventListenerOnQueuedUsingOnAndQueueGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  onQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): Promise<TEventListenerOnUnsubscribeQueued> {
    return QueueAsPromise<TEventListenerOnUnsubscribeQueued>(
      this,
      () => {
        return EventListenerOnWithQueuedUnsubscribe<GKeyValueTupleUnion, GKey>(this, key, callback);
      }
    );
  }
}



