import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../../event-listener-types';
import { TraitEventListenerOnceQueued } from '../trait-event-listener-once-queued';
import {
  ITraitEventListenerOnceQueuedEmulatedGSelfConstraint, TraitEventListenerOnceQueuedEmulated
} from '../trait-event-listener-once-queued-emulated';
import { CallTargetTraitMethodOrDefaultImplementation } from '../../../../../core/traits/call-trait-method';


export function EventListenerOnceQueued<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  target: ITraitEventListenerOnceQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion>,
  key: GKey,
  callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
): Promise<TEventListenerOnUnsubscribeQueued> {
  return CallTargetTraitMethodOrDefaultImplementation(
    target,
    TraitEventListenerOnceQueued,
    'onceQueued',
    [key, callback],
    TraitEventListenerOnceQueuedEmulated,
  );
}


