export type TEventMap = { [key: string]: any };
// export type TEventMap = { };
// export type TEventMap = object;

// export type TGenericEventMap = { [key: string]};

export type TInferEventMapKeys<TKVMap extends TEventMap> = Extract<keyof TKVMap, string>;

export type TInferEventMapValues<GEventMap extends TEventMap> = GEventMap[TInferEventMapKeys<GEventMap>];

/*----*/

export type TListenerCallback<GEventMap extends TEventMap, GEventName extends TInferEventMapKeys<GEventMap>> = (value: GEventMap[GEventName]) => void;

export type TListenerCallbackAsync<GEventMap extends TEventMap, GEventName extends TInferEventMapKeys<GEventMap>> = (value: GEventMap[GEventName]) => (void | Promise<void>);

export type TGenericListenerCallback = (value: any) => void;

export type TEventListenerOnUnsubscribe = () => void;

export type TEventListenerOnUnsubscribeAsync = () => Promise<void>;
