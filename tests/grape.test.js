const { exec } = require("child_process");

describe("Grape Node Setup", () => {
  it("should have Grape nodes running via docker-compose", (done) => {
    exec("docker compose ps", (err, stdout, stderr) => {
      if (err) {
        done.fail(`Error checking Grape nodes: ${stderr}`);
      } else {
        expect(stdout).toContain("grapevine-p2p-chat-grape1-1");
        expect(stdout).toContain("grapevine-p2p-chat-grape2-1");
        expect(stdout).toContain("Up"); // Check if they are "Up"
        done();
      }
    });
  }, 10000);
});
