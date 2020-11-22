import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';
import { TraitEventListenerOnQueued } from './trait-event-listener-on-queued';
import { TraitEventListenerOn } from '../trait-event-listener-on';
import { EventListenerAwaitUntilNotDispatchingWithPromise } from '../../helpers/event-listener-await-until-not-dispatching';
import { TraitEventListenerIsDispatching } from '../../trait-event-listener-is-dispatching/trait-event-listener-is-dispatching';
import { EventListenerOnWithEmulatedQueuedUnsubscribe } from './functions/event-listener-on-with-emulated-queued-unsubscribe';


/**
 * Tries to emulate TraitEventListenerOnQueued behavior.
 * WARN: only awaits until the event listener is not dispatching, the call order on its methods is not guaranteed
 */


export interface ITraitEventListenerOnQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOn<any, GKeyValueTupleUnion>, TraitEventListenerIsDispatching<any> {
}

@Trait()
export abstract class TraitEventListenerOnQueuedEmulated<GSelf extends ITraitEventListenerOnQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOnQueued<GSelf, GKeyValueTupleUnion> {
  onQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): Promise<TEventListenerOnUnsubscribeQueued> {
    return EventListenerAwaitUntilNotDispatchingWithPromise<TEventListenerOnUnsubscribeQueued>(
      this,
      () => {
        return EventListenerOnWithEmulatedQueuedUnsubscribe<GKeyValueTupleUnion, GKey>(this, key, callback);
      }
    );
  }
}


