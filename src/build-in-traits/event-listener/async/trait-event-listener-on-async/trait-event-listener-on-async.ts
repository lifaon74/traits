import {
  TEventListenerOnUnsubscribeAsync,
  TEventMap,
  TInferEventMapKeys,
  TListenerCallbackAsync,
} from '../../event-listener-types';
import { Trait } from '../../../../core/traits/trait-decorator';


@Trait()
export abstract class TraitEventListenerOnAsync<GSelf, GEventMap extends TEventMap> {
  abstract onAsync<GEventName extends TInferEventMapKeys<GEventMap>>(
    this: GSelf,
    eventName: GEventName,
    callback: TListenerCallbackAsync<GEventMap, GEventName>,
  ): Promise<TEventListenerOnUnsubscribeAsync>;
}

export type TInferTraitEventListenerOnAsyncGEventMap<GTrait extends TraitEventListenerOnAsync<any, TEventMap>> =
  GTrait extends TraitEventListenerOnAsync<any, infer GEventMap>
    ? GEventMap
    : never;
