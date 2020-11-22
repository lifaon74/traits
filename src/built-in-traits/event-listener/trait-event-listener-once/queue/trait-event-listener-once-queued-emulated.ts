import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribeQueued, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';
import { EventListenerAwaitUntilNotDispatchingWithPromise } from '../../helpers/event-listener-await-until-not-dispatching';
import { TraitEventListenerIsDispatching } from '../../trait-event-listener-is-dispatching/trait-event-listener-is-dispatching';
import { TraitEventListenerOn } from '../../trait-event-listener-on/trait-event-listener-on';
import { TraitEventListenerOnceQueued } from './trait-event-listener-once-queued';
import { EventListenerOnceWithEmulatedQueuedUnsubscribe } from './functions/event-listener-once-with-emulated-queued-unsubscribe';


/**
 * Tries to emulate TraitEventListenerOnceQueued behavior.
 * WARN: only awaits until the event listener is not dispatching, the call order on its methods is not guaranteed
 */


export interface ITraitEventListenerOnceQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOn<any, GKeyValueTupleUnion>, TraitEventListenerIsDispatching<any> {
}

@Trait()
export abstract class TraitEventListenerOnceQueuedEmulated<GSelf extends ITraitEventListenerOnceQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOnceQueued<GSelf, GKeyValueTupleUnion> {
  onceQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
  ): Promise<TEventListenerOnUnsubscribeQueued> {
    return EventListenerAwaitUntilNotDispatchingWithPromise<TEventListenerOnUnsubscribeQueued>(
      this,
      () => {
        return EventListenerOnceWithEmulatedQueuedUnsubscribe<GKeyValueTupleUnion, GKey>(this, key, callback);
      }
    );
  }
}


