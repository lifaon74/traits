import { Trait } from '../../../../core/traits/trait-decorator';
import {
  TEventListenerOnUnsubscribe,
  TEventMap,
  TInferEventMapKeys,
  TListenerCallback,
} from '../../event-listener-types';

@Trait()
export abstract class TraitEventListenerOn<GSelf, GEventMap extends TEventMap> {
  abstract on<GEventName extends TInferEventMapKeys<GEventMap>>(
    this: GSelf,
    eventName: GEventName,
    callback: TListenerCallback<GEventMap, GEventName>,
  ): TEventListenerOnUnsubscribe;
}

export type TInferTraitEventListenerOnGEventMap<GTrait extends TraitEventListenerOn<any, TEventMap>> =
  GTrait extends TraitEventListenerOn<any, infer GEventMap>
    ? GEventMap
    : never;
