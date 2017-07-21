const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");

// Replace hub.create with a mock noop
jest.mock("./hub", () => ({
  create: function(args, options, cb) {
    process.nextTick(function() {
      cb();
    });
  }
}));

const createSystem = require("./createSystem.js");

describe("createSystem", function() {
  it("can create a system", function(done) {
    let testName = "test-system-" + Date.now();

    createSystem(testName, function(err) {
      if (err) return done(err);

      expect(fs.existsSync(path.join(testName, "Makefile"))).toBeTruthy();

      exec("rm -r " + testName, function() {
        done();
      });
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
