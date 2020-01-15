const getUserData = require("./options");
let API = require("./APIUtility");

API.prototype.getDataSizeOfAPIResponse = async function() {
  let dataSize;
  let sizeofResponse = await this.getAPIReponse(getUserData);
  dataSize = sizeofResponse.length;
  return {
    datasize: dataSize
  };
};

API.prototype.fetchUserID = async function(value) {
  let getID;
  let sizeofResponse = await this.getAPIReponse(getUserData);
  dataSize = sizeofResponse.length;
  console.log("Expected employee id: " + value);

  for (let index = 0; index < sizeofResponse.length; index++) {
    if (sizeofResponse[index]["id"] === value) {
      getID = sizeofResponse[index]["id"];
      //  console.log(getvalue);
      return {
        userID: getID
      };
    }
  }
  return (getID = 0);
};

module.exports = API;
