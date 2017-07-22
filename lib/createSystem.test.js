const exec = require("child_process").exec;
const fs = require("fs-extra");
const path = require("path");

// Replace hub.create with a mock noop
jest.mock("./hub", () => ({
  create: function(args, options) {
    if (args === "alreadyexists")
      return Promise.reject(new Error("hub error: already exists"));

    return Promise.resolve();
  }
}));

const createSystem = require("./createSystem.js");

describe("createSystem", function() {
  it("can create a system", function(done) {
    let testName = "test-system-" + Date.now();

    createSystem(testName, function(err) {
      if (err) {
        fs.remove(testName).then(done, done);
      } else {
        expect(fs.existsSync(path.join(testName, "Makefile"))).toBeTruthy();
        fs.remove(testName).then(done, done);
      }
    });
  });

  it("fails when the repo already exists on github", () => {
    createSystem("alreadyexists").then(
      result => {
        expect(false).toBe("Never called");
      },
      err => {
        expect(err.message).toBe("hub error: already exists");
      }
    );
  });

  it("created system has valid tmuxinator config", function(done) {
    let testName = "test-system-" + Date.now();

    createSystem(testName, function(err) {
      if (err) return done(err);

      const content = fs.readFileSync(
        path.join(testName, "tmuxinator.all.yml"),
        "utf-8"
      );

      expect(
        content.indexOf(testName) > -1,
        "contains system name"
      ).toBeTruthy();

      exec("rm -r " + testName, function() {
        done();
      });
    });
  });
});
