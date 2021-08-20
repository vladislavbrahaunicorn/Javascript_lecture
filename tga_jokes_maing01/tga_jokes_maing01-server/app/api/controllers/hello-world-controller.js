"use-strict"
class HelloWorldController {
  helloWorld (ucEnv) {
    //vstup zvenci, tohle se pise za tou teckou
    let dtoOut = {
      text: "Hello World!",
      uuAppErrorMap: {}
    };
    return dtoOut;
  }
}

module.exports = new HelloWorldController(); //tohle se zavola pred teckou
