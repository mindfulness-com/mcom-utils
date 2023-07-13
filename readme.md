# Mindfulness.com Shared Utils

> A library of shared pure functions.
- [Mindfulness.com Shared Utils](#mindfulnesscom-shared-utils)
  - [Install](#install)
  - [Development](#development)
    - [Principles](#principles)
    - [Publishing](#publishing)
    - [Testing](#testing)

## Install

This project is now available as a private package on npm.
`npm install @mindfulness/utils`

## Development

This is a module, so the only way to run local is by running tests.
### Principles

**Development:**

1. Avoid complexity
2. Use functional programming to reduce complexity
3. Use strict typing where possible
4. Peer review where possible
5. Test application logic
6. Provide detailed descriptions using [JSDoc](https://jsdoc.app/index.html) format.

### Publishing

To publish a new version of the repo run:

```
npm run publish
```

Which essentially tests, builds, bumps the package version, and deploys the tag to git and deploy to npm.

### Testing

Run `npm run test` to run tests agains this library.
