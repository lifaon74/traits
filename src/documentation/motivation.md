## 🎯 Motivation

Javascript is a really flexible language:
classes inheritance works with prototypes which allows us to do practically everything in OO,
but working directly with the `prototype` is usually hazardous, hard to read and understand, very verbose,
and is not an easy task when you want to create a proper class (at least for new js developers).

There came ES6, which introduced classes and helped a lot to manage the constructor, properties, methods and inheritance.
It's a far better, easier, and more legible way to work that the previous `prototype` approach.

Sadly ES6 classes doesn't permit multi inheritance, nor sharing identical methods accros many classes.

In some cases (mostly when you build a library for other developers), multi inheritance is required.
For this, two common workaround exist:

- `Mixins` are classes with some internal state, constructor, etc... => and you copy their properties on your child classes
  - limits:
    - shared properties may conflict (especially prefixed private ones like `_attribute`)
    - the constructor may return a different `this`, meaning different `this` accros parent mixins, resulting in invalid properties assignation
    - you need to keep track of which mixins you've implemented on your classes if you need something similar to `instanceof`
- `Factories` are functions returning a class having its own state and methods and extending a base class
  => and you chain your factories to build your final class
  - it solves the problem of the `this` we've seen with mixins
  - but... every other problems remain (conflict on properties, instanceof, etc...)


I explored intensely both of these solutions, writing many libraries using these patterns, but each time, I faced their limits and was not totally satisfied.

In my mind, I wanted something able to share methods across multiple classes, avoiding code duplication,
and the possibility to implement only the methods I needed, reducing drastically the final build
(ex: if someone doesn't use the method `doSomething()`, then it should not be part of the class, meaning not in the final script)
=> building myself my classes based on bricks (here: methods).

---

Other languages like *rust*, *php*, or many others have found a solution to this: `Traits`

I'll speak more about [rust traits](https://doc.rust-lang.org/book/ch10-02-traits.html) because I find their approach very elegant:

- on one side, you have the data: a structure with properties which contains some data and nothing else
- on the other side, you have the traits: a collection of methods. It may be specialized for a specific structure of data, or kept generic.

Then, you tell the program that your data structure implements `traitA`, `traitB`, etc...
and when you write `data.someMethod().anotherMethod()` it somehow does `anotherMethod(someMethod(data))`.
It's important to note that *the data doesn't carry the methods* (as opposed to javascript, where class instances have methods from the prototype chain),
instead the functions are resolved by the types.


At the end, it's very different of our traditional OO approach with classes, inheritance, etc... but it's actually very cleaver.

I wanted to have the same possibilities on javascript, so I wrote an equivalent in Typescript (works too in javascript, but typing is pretty important for Traits).

