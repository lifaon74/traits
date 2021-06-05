## areTraitsImplementedBy

```ts
declare function areTraitsImplementedBy<GTraits extends any[], GTarget>(
  traits: { [GKey in keyof GTraits]: IAbstractConstructor<GTraits[GKey]> },
  target: GTarget,
): target is IWithImplementedTraits<GTarget, GTraits> ;
```

Like [isTraitImplementedBy](../is-trait-implemented-by/is-trait-implemented-by.md) but for many traits.



