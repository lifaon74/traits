## For who ? ##

**Try them if:**

- you want to provide a well-defined and very strong typed library, based on classes
- you want reusable methods across various classes, and mixins and factories are not enough for you
- you want to share your lib piece by piece and let the user choose which part they want (allows very efficient tree shacking and minification)
- you want to hide or externalize the internal logic of your classes

**You probably don't need them if:**

- you aim for fast coding: traits are verbose, and require strict typing to be more efficient.
- your code is not a library (ex: ux, component, server script, etc.)

Traits enforce you to code in a very strict manner, which is perfect for library authors requiring a strict framework and typing
to avoid errors and bugs (of course completed by tests). It's important when they are sometimes shared with millions of users.
In another hand, Traits are not recommended for typical organization work (building ux component, application, etc...).

