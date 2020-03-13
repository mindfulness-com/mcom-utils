# Mindfulness.com Shared Utils

> A library of shared pure functions.

## Principles

**Development:**

1. Avoid complexity
1. Use functional programming to reduce complexity
1. Use strict typing where possible
1. Peer review where possible
1. Test application logic

## Running locally

This is a module, so the only way to run local is by running tests.

## Consuming

This project is not deployed through NPM as in the future it will be a private repo.

For now the module is still fetched through npm using a git reference.

To add this to your project add the following to your `package.json` `dependencies`:

"@mcom/utils": "git+https://github.com/mindfulness-com/mcom-utils.git#v0.1.8",

Note the version number at the end of the string which references a specific git tag.

Then run `npm install` to install the depenency.

## Publishing

While this module is not yet published through npm, we use node package versioning
with git tags to manage depenency versions.

To publish a new version of the repo run:

```
npm run publish
```

Which essentially tests, builds, bumps the package version, and deploys the tag to git.

## Testing

Run `npm run test` to run tests agains this library.
