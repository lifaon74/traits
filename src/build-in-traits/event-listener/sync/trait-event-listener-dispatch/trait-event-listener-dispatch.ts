import { Trait } from '../../../../core/traits/trait-decorator';
import { TEventMap, TInferEventMapKeys } from '../../event-listener-types';

@Trait()
export abstract class TraitEventListenerDispatch<GSelf, GEventMap extends TEventMap> {
  abstract dispatch<GEventName extends TInferEventMapKeys<GEventMap>>(this: GSelf, eventName: GEventName, value: GEventMap[GEventName]): void;
}

export type TInferTraitEventListenerDispatchGEventMap<GTrait extends TraitEventListenerDispatch<any, TEventMap>> =
  GTrait extends TraitEventListenerDispatch<any, infer GEventMap>
    ? GEventMap
    : never;
