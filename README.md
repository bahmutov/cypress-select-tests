# cypress-select-tests

> Userspace solution for picking Cypress tests to run

See [cypress/plugins/index.js](cypress/plugins/index.js)

## Run

```
npm install
npx cypress open
```

## Example

Currently selecting spec files and tests using `fgrep` and `grep` strings similar to Mocha's

For example to run just the tests that have "does" in their name

```
DEBUG=itify npx cypress run --env grep=does
  itify Found 4 tests +1ms
picking tests to run in file cypress/integration/spec.js
  itify  - Example tests / works
  itify  - Example tests / nested / does A
  itify  - Example tests / nested / does B
  itify  - Example tests / nested / does C
  itify  +0ms
  itify Will only run 3 tests +0ms
  itify  - Example tests / nested / does A
  itify  - Example tests / nested / does B
  itify  - Example tests / nested / does C
  itify  +0ms
  itify disabling test [ 'Example tests', 'works' ] +2s
  itify leaving test [ 'Example tests', 'nested', 'does A' ] +0ms
  itify leaving test [ 'Example tests', 'nested', 'does B' ] +0ms
  itify leaving test [ 'Example tests', 'nested', 'does C' ] +1ms
```

And out of 2 specs, only 3 tests in the "spec.js" are executed

```
  Example tests
    - works
    nested
      ✓ does A
      ✓ does B
      ✓ does C


  3 passing (74ms)
  1 pending
```

## Debugging

To see additional debugging output run

```
DEBUG=itify npx cypress open
```
