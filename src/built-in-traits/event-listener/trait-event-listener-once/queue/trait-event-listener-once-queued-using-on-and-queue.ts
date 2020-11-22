import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';
import { TraitQueue } from '../../../queue/trait-queue/trait-queue';
import { QueueAsPromise } from '../../../queue/helpers/queue-as-promise';
import { TraitEventListenerOn } from '../../trait-event-listener-on/trait-event-listener-on';
import { EventListenerOnceWithQueuedUnsubscribe } from './functions/event-listener-once-with-queued-unsubscribe';

export interface ITraitEventListenerOnceQueuedUsingOnAndQueueGSelfConstraint<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOn<any, GKeyValueTupleUnion>,
  TraitQueue<any> {
}

@Trait()
export abstract class TraitEventListenerOnceQueuedUsingOnAndQueue<GSelf extends ITraitEventListenerOnceQueuedUsingOnAndQueueGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  onceQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): Promise<TEventListenerOnUnsubscribeQueued> {
    return QueueAsPromise<TEventListenerOnUnsubscribeQueued>(
      this,
      () => {
        return EventListenerOnceWithQueuedUnsubscribe<GKeyValueTupleUnion, GKey>(this, key, callback);
      }
    );
  }
}



