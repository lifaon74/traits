import { Trait } from '../../../../core/traits/trait-decorator';
import { TEventMap, TInferEventMapKeys } from '../../event-listener-types';

@Trait()
export abstract class TraitEventListenerIsDispatching<GSelf, GEventMap extends TEventMap> {
  abstract isDispatching(this: GSelf): boolean;
}

export type TInferTraitEventListenerIsDispatchingGEventMap<GTrait extends TraitEventListenerIsDispatching<any, TEventMap>> =
  GTrait extends TraitEventListenerIsDispatching<any, infer GEventMap>
    ? GEventMap
    : never;
