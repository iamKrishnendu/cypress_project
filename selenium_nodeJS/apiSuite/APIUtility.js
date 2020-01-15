const request = require("request");

var API = function() {
  this.getAPIReponse = function(option) {
    return new Promise((resolve, reject) => {
      try {
        request(option, function(err, response, body) {
          if (err) throw new Exception(err);
          console.log(JSON.stringify(option, null, 2));
          if (response.statusCode === 200) {
            resolve(body);
            return;
          }
        });
      } catch (ex) {
        reject("Exception occured");
        throw new Exception(
          "While exception response status code is: " +
            response.statusCode +
            " with exception:" +
            ex
        );
      }
    });
  };
};

module.exports = API;
