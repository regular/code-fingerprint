code-fingerprint
---

```js
const fp = require('code-fingerprint')

fp('console.log("hello world")')
// ==> a base64 encoded sha256

```

The fingerprint is identical for code that only differs in comments, formatting and variable and function names.
See tests for details.

# How does it work?

It minifies the code using Terser and hashes the output. We use the normalizing effect of minimizing. However, there will be false negatives, meaning two functional identical pieces of code might have different fingerprints. False positives would be a bug though.

This is a very simple appriach and experimental. Don't be surprised if it doesn't work for you.

# API

`sha = fingerprint(code [, warnings])`

If the 2nd argument is provided it should be an empty array (or something else with a `push` method) and it will be filled with warnings if they should occur.

License: MIT

