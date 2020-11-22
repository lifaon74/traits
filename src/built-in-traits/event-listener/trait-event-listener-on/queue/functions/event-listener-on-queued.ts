import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../../event-listener-types';
import { TraitEventListenerOnQueued } from '../trait-event-listener-on-queued';
import {
  ITraitEventListenerOnQueuedEmulatedGSelfConstraint, TraitEventListenerOnQueuedEmulated
} from '../trait-event-listener-on-queued-emulated';
import { CallTargetTraitMethodOrDefaultImplementation } from '../../../../../core/traits/call-trait-method';


export function EventListenerOnQueued<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  target: ITraitEventListenerOnQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion>,
  key: GKey,
  callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
): Promise<TEventListenerOnUnsubscribeQueued> {
  return CallTargetTraitMethodOrDefaultImplementation(
    target,
    TraitEventListenerOnQueued,
    'onQueued',
    [key, callback],
    TraitEventListenerOnQueuedEmulated,
  );
}


