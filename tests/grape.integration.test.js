const { spawn } = require("child_process");
const Link = require("grenache-nodejs-link");

let grape1, grape2, link;

beforeAll((done) => {
  grape1 = spawn("grape", [
    "grape",
    "--dp",
    "20001",
    "--aph",
    "30001",
    "--bn",
    "127.0.0.1:20002",
  ]);
  grape1.stdout.on("data", (data) => {
    console.log(`grape1 stdout: ${data}`);
  });
  grape1.stderr.on("data", (data) => {
    console.error(`grape1 stderr: ${data}`);
  });

  grape2 = spawn("grape", [
    "--dp",
    "20002",
    "--aph",
    "40001",
    "--bn",
    "127.0.0.1:20001",
  ]);
  grape2.stdout.on("data", (data) => {
    console.log(`grape2 stdout: ${data}`);
  });
  grape2.stderr.on("data", (data) => {
    console.error(`grape2 stderr: ${data}`);
  });

  // Wait a few seconds to ensure both Grapes are running before continuing
  setTimeout(() => {
    link = new Link({
      grape: "http://127.0.0.1:30001",
    });
    link.start();
    done();
  }, 3000);
});

afterAll(() => {
  grape1.kill();
  grape2.kill();
  link.stop();
});

test("should register and discover services on the DHT", (done) => {
  // Announce a service
  link.put({ v: "test-service" }, (err, hash) => {
    expect(err).toBeNull();

    // Lookup the service on the DHT
    link.get(hash, (err, res) => {
      expect(err).toBeNull();
      expect(res.v).toBe("test-service");
      done();
    });
  });
});
