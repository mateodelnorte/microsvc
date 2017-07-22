const exec = require("./_exec");

describe("_exec", () => {
  it("returns stdout on success", () =>
    exec('echo "hello"').then(stdout => {
      expect(stdout).toEqual("hello\n");
    }));

  it.skip("does not reject when errors are logged", () =>
    exec('>&2 echo "error"').then(
      () => expect(false).toBe("never called"),
      err => {
        expect(err instanceof Error).toBeTruthy();
        expect(err.message).toBe("error\n");
      }
    )
  );

  it("rejects when non zero exit code", () =>
    exec("false").then(
      () => expect(false).toBe("never called"),
      err => {
        expect(err instanceof Error).toBeTruthy();
        expect(err.message).toBe("Error: Command failed: false\n");
      }
    ));
});
