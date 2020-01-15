const { describe, it, after, before } = require("mocha");
const API = require("../apiSuite/dummyAPI");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const { getDatafromGeneralSheet, getData } = require("../utils/excelParser");
chai.use(chaiAsPromised);

(async function apiTestSuite() {
  try {
    let api;
    console.log("under try");
    before(function() {
      this.timeout(150000);
      console.log("Start API validation...");
      api = new API();
    });
    describe("Validate User details from Dummy API", function() {
      it("Validte total data size of the API response", async function() {
        console.log("Start API validation...");
        this.timeout(15000);
        const totalDataLength = await api.getDataSizeOfAPIResponse();
        const lenght = totalDataLength.datasize;
        console.log(lenght);
        expect(lenght).to.equal(13528);
      });
      it("Validate user ID from dummy API", async function() {
        this.timeout(15000);
        let expectedEmpID = await getData("APIValidation", "ID");
        let employeeName = await api.fetchUserID(expectedEmpID);
        console.log(employeeName.userID);
        expect(employeeName.userID).to.equal(expectedEmpID);
      });
    });
  } catch (ex) {
    console.log(ex);
    throw new Exception(ex);
  } finally {
  }
})();

process.on("unhandledRejection", (promise, reason) => {
  console.log("Error occured.");
});
