import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';
import { TraitEventListenerDispatchQueued } from './trait-event-listener-dispatch-queued';
import { QueueAsPromise } from '../../../queue/helpers/queue-as-promise';
import { TraitQueue } from '../../../queue/trait-queue/trait-queue';
import { TraitEventListenerDispatch } from '../trait-event-listener-dispatch';


export interface ITraitEventListenerDispatchQueuedUsingDispatchAndQueueGSelfConstraint<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerDispatch<any, GKeyValueTupleUnion>,
  TraitQueue<any> {
}

@Trait()
export abstract class TraitEventListenerDispatchQueuedUsingDispatchAndQueue<GSelf extends ITraitEventListenerDispatchQueuedUsingDispatchAndQueueGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerDispatchQueued<GSelf, GKeyValueTupleUnion> {
  dispatchQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>,
  ): Promise<void> {
    return QueueAsPromise<void>(
      this,
      () => {
        this.dispatch<GKey>(key, value);
      }
    );
  }
}
