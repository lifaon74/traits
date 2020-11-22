
/** KEY VALUE TUPLE **/

export type TKeyValueTuple<GKey, GValue> = [GKey, GValue];

export type TGenericKeyValueTuple = TKeyValueTuple<any, any>;

export type TInferKeyValueTupleGKey<GKeyValueTuple extends TGenericKeyValueTuple> =
  GKeyValueTuple extends TKeyValueTuple<infer GKey, any>
   ? GKey
   : never;

export type TInferKeyValueTupleGValue<GKeyValueTuple extends TGenericKeyValueTuple> =
  GKeyValueTuple extends TKeyValueTuple<any, infer GValue>
    ? GValue
    : never;


/** UNION **/

export type TGenericKeyValueTupleUnion = TGenericKeyValueTuple;

export type TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> =
  TInferKeyValueTupleGKey<GKeyValueTupleUnion>;

export type TInferKeyValueTupleUnionGValue<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> =
  TInferKeyValueTupleGValue<GKeyValueTupleUnion>;

export type TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion extends TGenericKeyValueTuple, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>> =
  GKeyValueTupleUnion extends TKeyValueTuple<GKey, infer GValue>
    ? GValue
    : never;

export type TKeyValueMapToKeyValueTupleUnion<GObject extends object> = {
  [GKey in Extract<keyof GObject, string>]: TKeyValueTuple<GKey, GObject[GKey]>;
}[Extract<keyof GObject, string>];


export type TKeyValueTupleUnionToKeyValueMap<GKeyValueTupleUnion extends TGenericKeyValueTuple> = {
  [GKey in TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>]: GKeyValueTupleUnion extends TKeyValueTuple<GKey, infer GValue>
    ? GValue
    : never;
};

/**
 * Constraints GKeyValueTupleUnion to be a super set of GKeyValueTupleSubSetUnion
 */
export type TKeyValueTupleUnionSuperSetConstraint<GKeyValueTupleUnion extends TGenericKeyValueTuple, GKeyValueTupleSubSetUnion extends TGenericKeyValueTuple> =
  [GKeyValueTupleSubSetUnion] extends [GKeyValueTupleUnion]
    ? TGenericKeyValueTuple
    : never;

export type TKeyValueTupleUnionSubSetConstraint<GKeyValueTupleUnion extends TGenericKeyValueTuple, GKeyValueTupleSuperSetUnion extends TGenericKeyValueTuple> =
  [GKeyValueTupleUnion] extends [GKeyValueTupleSuperSetUnion]
    ? TGenericKeyValueTuple
    : never;

/*----*/


export type TInferListenerCallbackFromKeyValueTupleUnionAndKey<GKeyValueTupleUnion extends TGenericKeyValueTuple, GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>> =
  (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void;

export type TGenericListenerCallback = (value: any) => void;

export type TEventListenerOnUnsubscribe = () => void;

export type TEventListenerOnUnsubscribeQueued = () => Promise<void>;


