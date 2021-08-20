const JokeAbl = require ('../../abl/joke-abl.js');

class JokeController {

  async getImageData(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let dtoOut = await JokeAbl.getImageData(ucEnv.getUri().getAwid(), dtoIn);
    return ucEnv.setBinaryDtoOut(dtoOut, dtoIn.contentDisposition);
  }

  list(ucEnv) {
    return JokeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  create (ucEnv) {
    return JokeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new JokeController ();
