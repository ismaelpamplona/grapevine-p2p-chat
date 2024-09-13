# implement_environment_setup (Issue)

- [x] Initialize a new Node.js project using `npm init`.
- [x] Install `grenache-nodejs-ws`, `grenache-nodejs-link`, and `grenache-grape`.
- [x] Set up the basic project structure (folders for `src`, `tests`, etc.).
- [x] Create a Dockerfile for running Grape nodes.
- [x] Create a `docker-compose.yml` for running multiple Grape instances.
- [x] Install jest `npm install --save-dev jest` for testing.
- [x] Write initial test for ensuring Grape nodes run correctly.
- [x] Run Docker
  ```bash
  $ docker compose up
  [+] Running 2/2
    ✔ Container grapevine-p2p-chat-grape2-1  Recreated                              0.3s
    ✔ Container grapevine-p2p-chat-grape1-1  Recreated                              0.3s
  Attaching to grape1-1, grape2-1
  ```
- [x] Run tests

  ```bash
  $ npm run test

  > grapevine-p2p-chat@1.0.0 test
  > npx jest

   PASS  tests/grape.test.js
    Grape Node Setup
      ✓ should have Grape nodes running via docker-compose (81 ms)

  Test Suites: 1 passed, 1 total
  Tests:       1 passed, 1 total
  Snapshots:   0 total
  Time:        0.395 s, estimated 6 s
  Ran all test suites.
  ```

- [ ] Add nodemon for auto reload on save
