## traitsAreImplementedBy

```ts
declare function traitsAreImplementedBy<GTraits extends any[], GTarget>(
  traits: { [GKey in keyof GTraits]: IAbstractConstructor<GTraits[GKey]> },
  target: GTarget,
): target is IWithImplementedTraits<GTarget, GTraits> ;
```

Like [iraitIsImplementedBy](../trait-is-implemented-by/trait-is-implemented-by.md) but for many traits.



