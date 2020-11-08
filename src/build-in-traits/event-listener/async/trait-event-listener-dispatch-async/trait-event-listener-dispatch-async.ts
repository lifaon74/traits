import { TEventMap, TInferEventMapKeys } from '../../event-listener-types';
import { Trait } from '../../../../core/traits/trait-decorator';


@Trait()
export abstract class TraitEventListenerDispatchAsync<GSelf, GEventMap extends TEventMap> {
  abstract dispatchAsync<GEventName extends TInferEventMapKeys<GEventMap>>(this: GSelf, eventName: GEventName, value: GEventMap[GEventName]): Promise<void>;
}

export type TInferTraitEventListenerDispatchAsyncGEventMap<GTrait extends TraitEventListenerDispatchAsync<any, TEventMap>> =
  GTrait extends TraitEventListenerDispatchAsync<any, infer GEventMap>
    ? GEventMap
    : never;
