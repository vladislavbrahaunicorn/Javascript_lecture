const { TestHelper } = require("uu_appg01_server-test");
const path = require("path");
const fs = require("fs");

beforeEach(async () => {
  // fire up application and database
  // Authentication, Authorization and verification of System States are disabled, because they are not objective of testing
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Joke uuCMD tests", () => {
  test("example 07 - image does not exist", async () => {
    expect.assertions(2);
    try {
      await TestHelper.executeGetCommand("joke/getImageData", { image: "12345" });
    } catch (e) {
      expect(e.code).toEqual("tga-jokes-main/joke/getImageData/jokeImageDoesNotExist");
      expect(e.status).toEqual(400);
    }
  });

  test("example 07 - create image", async done => {
    let imagePath = path.resolve(__dirname, "test_files/joke.jpg");
    let dtoIn = {
      name: "Joke 1",
      text: "joke about ...",
      image: fs.createReadStream(imagePath)
    };

    let result = await TestHelper.executePostCommand("joke/create", dtoIn);
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.image).toBeTruthy();
    expect(result.status).toEqual(200);

    let resultGetJoke = await TestHelper.executeGetCommand("joke/getImageData", { image: result.data.image });
    expect(resultGetJoke.status).toEqual(200);
    expect(resultGetJoke.data.filename).toBe("joke.jpg");
    expect(resultGetJoke.data.contentType).toBe("image/jpeg");
    expect(resultGetJoke.data.readable).toBe(true);

    // compare original a received image lengths
    let originalDataLength = fs.readFileSync(imagePath).length;
    let receivedDataLength = 0;

    resultGetJoke.data.on("end", () => {
      expect(receivedDataLength).toBe(originalDataLength);
      done();
    });
    resultGetJoke.data.on("readable", () => {
      let chunk;
      while ((chunk = resultGetJoke.data.read()) !== null) {
        receivedDataLength += chunk.length;
      }
    });
  });
});