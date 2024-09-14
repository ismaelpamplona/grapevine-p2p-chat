# add_grape_integration_test (Issue)

- [x] Start two Grape instances programmatically within the test
- [x] Set up the DHT and verify peer connectivity
- [x] Write an integration test to ensure peers can register and discover services
- [x] Clean up and close the Grape instances after the test
- [x] Run tests

```bash
$ npm run test

> grapevine-p2p-chat@1.0.0 test
> npx jest

 PASS  tests/grape.integration.test.js
  ✓ should register and discover services on the DHT (36 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.426 s, estimated 4 s
Ran all test suites.

```
