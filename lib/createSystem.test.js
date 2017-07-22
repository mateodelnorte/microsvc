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

describe("createSystem", () => {
  let testName;
  beforeEach(() => {
    testName = "test-system-" + Date.now();
  });

  afterEach(() => fs.remove(testName).catch(() => true));

  it("can create a system", () => {
    return createSystem(testName).then(() => {
      expect(fs.existsSync(path.join(testName, "Makefile"))).toBeTruthy();
    });
  });

  it("fails when the repo already exists on github", () => {
    return createSystem("alreadyexists").then(
      result => {
        expect(false).toBe("Never called");
      },
      err => {
        expect(err.message).toBe("hub error: already exists");
        return fs.remove("alreadyexists");
      }
    );
  });

  it("created system has valid tmuxinator config", () =>
    createSystem(testName).then(() => {
      const content = fs.readFileSync(
        path.join(testName, "tmuxinator.all.yml"),
        "utf-8"
      );

      expect(content.indexOf(testName) > -1).toBeTruthy();
    }));
});
