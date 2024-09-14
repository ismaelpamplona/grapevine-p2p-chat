const { exec } = require("child_process");
const Link = require("grenache-nodejs-link");

let grape1, grape2, link;

beforeAll((done) => {
  // Start first Grape instance
  grape1 = exec(
    "grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting grape1: ${error}`);
        return;
      }
    }
  );

  // Start second Grape instance
  grape2 = exec(
    "grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting grape2: ${error}`);
        return;
      }
    }
  );

  // Initialize the link to Grape
  link = new Link({
    grape: "http://127.0.0.1:30001",
  });
  link.start();

  // Wait a few seconds to ensure both Grapes are running before continuing
  setTimeout(done, 2000);
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
