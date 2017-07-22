const exec = require("child_process").exec;
const fs = require("fs-extra");
const path = require("path");

// Replace hub.create with a mock noop
jest.mock("./hub", () => ({
  create: function(args, options) {
    return Promise.resolve();
  }
}));

const createSystem = require("./createSystem.js");

describe("createSystem", function() {
  it.only("can create a system", function(done) {
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
