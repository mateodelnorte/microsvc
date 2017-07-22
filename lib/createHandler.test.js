const fs = require("fs-extra");
const path = require("path");

const createHandler = require("./createHandler.js");

describe("createSystem", () => {
  let testName;
  beforeEach(() => {
    testName = "test-handler-" + Date.now();
  });

  it("can create a handler by using only its name", () =>
    createHandler({ name: testName }).then(() => {
      expect(fs.existsSync(`./lib/handlers/${testName}.js`)).toBeTruthy();
      return fs.remove("./lib/handlers").catch(() => {});
    }));

  it("can create a handler by assiging it an absolute path", () =>
    createHandler({ name: testName, dir: "/tmp" }).then(() => {
      expect(fs.existsSync(`/tmp/${testName}.js`)).toBeTruthy();

      return fs.remove(`/tmp/${testName}.js`).catch(() => {});
    }));

  it("can create a handler by assiging it a relative path", () =>
    createHandler({ name: testName, dir: "tst" }).then(() => {
      expect(fs.existsSync(`./tst/${testName}.js`)).toBeTruthy();

      return fs.remove(`./tst/${testName}.js`).catch(() => {});
    }));
});
