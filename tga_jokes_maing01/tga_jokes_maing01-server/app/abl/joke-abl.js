'use strict';
const Path = require ('path');
const {Validator} = require ('uu_appg01_server').Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ValidationHelper} = require ('uu_appg01_server').AppServer;
const {BinaryStoreError} = require("uu_appg01_binarystore");
const Errors = require ('../api/errors/joke-error.js');
const {LoggerFactory} = require("uu_appg01_server").Logging;
    
const logger = LoggerFactory.get("TgaJokes.Abls.JokeAbl");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  getImageDataUnsupportedKeys: {
    code: `${Errors.GetImageData.UC_CODE}unsupportedKeys`
  },
};
const EXECUTIVES_PROFILE = 'Executives';

class JokeAbl {
  constructor () {
    this.validator = Validator.load ();
    this.jokeImageDao = DaoFactory.getDao("jokeImage");
    this.jokeImageDao.createSchema();

    this.dao = DaoFactory.getDao("joke");
    this.dao.createSchema();
  }

  async getImageData(awid, dtoIn) {
    
  }

  async list (awid, dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate ('jokeListDtoInType', dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult (
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // hds 2
    let dtoOut = await this.dao.listByVisibility (awid, true, dtoIn.pageInfo);

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create (awid, dtoIn, session, authorizationResult) {
    // hds 1, 1.1
    let validationResult = this.validator.validate (
      'jokeCreateDtoInType',
      dtoIn
    );

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult (
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // hds 2
    dtoIn.visibility = authorizationResult
      .getAuthorizedProfiles ()
      .includes (EXECUTIVES_PROFILE);


    logger.debug("tady se ma neco zalogovat!")

      // hds 2
    let jokeImage;
    if (dtoIn.image) {
      try {
        jokeImage = await this.jokeImageDao.create({awid}, dtoIn.image);
      } catch (e) {
        if (e instanceof BinaryStoreError) { // A3
          throw new Errors.Create.JokeImageDaoCreateFailed({uuAppErrorMap}, e);
        }
        throw e;
      }
      dtoIn.image = jokeImage.code;
    }


    // hds 3
    dtoIn.uuIdentity = session.getIdentity ().getUuIdentity ();
    dtoIn.uuIdentityName = session.getIdentity ().getName ();

    // hds 4
    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create (dtoIn); //tohle zavola joke-mongo.js metodu
    } catch (e) {
      if (e instanceof ObjectStoreError) {
      
        if (jokeImage) {
          await this.jokeImageDao.deleteByCode(awid, jokeImage.code);
        }
        if (e instanceof ObjectStoreError) {
          throw new Errors.Create.JokeDaoCreateFailed({uuAppErrorMap}, e);
        }
      throw e;
    }

  
  }
    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
}

  async getImageData(awid, dtoIn) {
    // hds 1
    // hds 1.1
    let validationResult = this.validator.validate("jokeGetImageDataDtoInType", dtoIn);
    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.getImageDataUnsupportedKeys.code, Errors.GetImageData.InvalidDtoIn);

    // hds 2
    let dtoOut;
    try {
      dtoOut = await this.jokeImageDao.getDataByCode(awid, dtoIn.image);
    } catch (e) {
      if (e.code === "uu-app-binarystore/objectNotFound") { // A3
        throw new Errors.GetImageData.JokeImageDoesNotExist({uuAppErrorMap}, {image: dtoIn.image});
      }
      throw e;
    }

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new JokeAbl ();
