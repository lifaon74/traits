## 🤔 For who ?

The first question to ask is: do you realy need Traits ?

**Traits are perfect if:**

- you want to provide a well-defined and very strong typed library (based on classes)
- you want reusable methods across various classes, and mixins and factories are not enough for you
- you want to share your library piece by piece and let the users choose which part they want (this allows very efficient tree shacking and minification)
- you want to hide or externalize the internal logic of your classes

**Traits are not for you if:**

- you aim for fast coding or prototyping: traits are verbose, and require strict and complex typing.
- your code is not a library (ex: ux, component, server script, etc.)

Traits enforce you to code in a very strict manner, which is perfect for library authors requiring a strict framework and typing
to mitigate errors and bugs.

In another hand, Traits are not recommended for typical organization work (building ux component, application, etc...).

