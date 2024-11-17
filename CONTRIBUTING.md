# Contributing

This projet is open to everyone. Feel free to test the library, share it, improve it, and create merge requests.

### Getting started

The library requires [Node.js](https://nodejs.org/en) `22+` and [yarn](https://yarnpkg.com/).

First, we have to switch to the correct version of node:

```shell
nvm use
```

If you don't have [nvm](https://github.com/nvm-sh/nvm), you may manually install and use Node.js 22+.

Then, we have to use the proper package manager (here `yarn`):

```shell
corepack enable
```

And install the dependencies:

```shell
yarn install
```

### Code

- The source code is located in the `src` directory.
- The projet uses [prettier](https://prettier.io/) to format the code. You'll want to enable and configure it in your IDE.
- The tests are run with [vitest](https://vitest.dev)

### Commands

- `fb:build`: builds the library.
- `fb:format`: formats the code using `prettier`.
- `fb:test`: runs the tests using `vitest`.
- `fb:dev`: builds the lib in `dev` mode, and publishes it on a local `verdaccio`.
