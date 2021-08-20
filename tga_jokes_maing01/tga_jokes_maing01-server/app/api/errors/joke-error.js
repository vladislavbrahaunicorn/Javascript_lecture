"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const JOKE_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}joke/`;
const UuJokesError = require("./uu-jokes-error");

const Create = {
  UC_CODE: `${JOKE_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  JokeDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeDaoCreateFailed`;
      this.message = "Create joke by joke Dao create failed.";
    }
  },
};

const List = {
  UC_CODE: `${UuJokesError.ERROR_PREFIX}joke/list/`,

  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const GetImageData = {
  UC_CODE: `${JOKE_ERROR_PREFIX}getImageData/`,
  
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${GetImageData.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeImageDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${GetImageData.UC_CODE}jokeImageDoesNotExist`;
      this.message = "Object jokeImage does not exist.";
    }
  }
};

module.exports = {
  GetImageData,
  List,
  Create
};
