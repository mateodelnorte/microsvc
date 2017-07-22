const exec = require("./_exec");

describe("_exec", () => {
  it("returns stdout on success", () =>
    exec('echo "hello"').then(stdout => {
      expect(stdout).toEqual("hello\n");
    }));

  it("does not reject when errors are logged", () =>
    exec('echo "error" >&2')
      .then(output => {})
      .catch(() => expect(false).toBe("never called")));

  it("rejects when non zero exit code", () =>
    exec("exit 1").then(
      () => expect(false).toBe("never called"),
      err => {
        /*expect(err instanceof Error).toBeTruthy();
        console.log(err);
        expect(err.message).toBe("Error: Command failed: false");*/
      }
    ));
});
