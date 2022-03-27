## 🎯 Motivation

Javascript is a really flexible language: it uses `prototype` for inheritance giving us a very powerful tool to build complex objects and classes.

However, it suffers from 2 importants issues:

- working directly with the `prototype` is usually hazardous, hard to read and understand, very verbose,
  and not an easy task. To simplify all of this, classes were introduced with ES6. 
  It's a far better, easier, and more legible way to work that the previous `prototype` approach. But:
- ES6 classes doesn't permit multi inheritance, nor sharing identical methods accros many classes.

So we have now, an elegant but limited solution.

In some cases (mostly when you build a library for other developers), multi inheritance is a must.
For this, two common workarounds exist:

- `Mixins` are classes with some internal state, constructor, etc... => and you copy their properties on your child classes
  - limits:
    - shared properties may conflict (especially prefixed private ones like `_attribute`)
    - the constructor may return a different `this`, meaning different `this` accros parent mixins, resulting in invalid properties assignation
    - you need to keep track of which mixins you've implemented on your classes if you need something similar to `instanceof`
- `Factories` are functions returning a class having its own state and methods and extending a base class
  => and you chain your factories to build your final class
  - it solves the problem of the `this` we've seen with mixins
  - but... every other problems remain (conflict on properties, instanceof, etc...)


I explored intensely both of these solutions, writing or using many libraries using these patterns.
But, each time, I faced their limits and was not totally satisfied.

In my mind, I wanted something like legos: build my classes bricks by bricks (here their methods).
It would give me the possibility to re-use existing methods, perform multi-inheritance on my classes,
and implement only what is required (which induces a smaller build)

**...so I wrote this library**
