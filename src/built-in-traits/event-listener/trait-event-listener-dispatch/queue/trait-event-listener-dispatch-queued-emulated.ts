import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
} from '../../event-listener-types';

import { EventListenerAwaitUntilNotDispatchingWithPromise } from '../../helpers/event-listener-await-until-not-dispatching';
import { TraitEventListenerIsDispatching } from '../../trait-event-listener-is-dispatching/trait-event-listener-is-dispatching';
import { TraitEventListenerDispatch } from '../trait-event-listener-dispatch';
import { TraitEventListenerDispatchQueued } from './trait-event-listener-dispatch-queued';


/**
 * Tries to emulate TraitEventListenerDispatchQueued behavior.
 * WARN: only awaits until the event listener is not dispatching, the call order on its methods is not guaranteed
 */


export interface ITraitEventListenerDispatchQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerDispatch<any, GKeyValueTupleUnion>, TraitEventListenerIsDispatching<any> {
}

@Trait()
export abstract class TraitEventListenerDispatchQueuedEmulated<GSelf extends ITraitEventListenerDispatchQueuedEmulatedGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerDispatchQueued<GSelf, GKeyValueTupleUnion> {
  dispatchQueued<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>,
  ): Promise<void> {
    return EventListenerAwaitUntilNotDispatchingWithPromise(this, () => {
      this.dispatch<GKey>(key, value);
    });
  }
}


