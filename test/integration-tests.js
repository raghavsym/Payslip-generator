const chai = require("chai");
const request = require("supertest");
const app = require("../src/server/server").default;
const payslipInfo = require("./fixtures/payslipInfo.json");
chai.should();

/**
 * Payslip API integration tests
 */
describe("Payslip API integration testing", () => {
  describe("On success of API", () => {
    it("Status should be 200 OK", (done) => {
      request(app)
        .post("/v1/payslip")
        .send(payslipInfo)
        .expect("Content-type", "text/html; charset=utf-8")
        .expect((res) => {
          res.status.should.equal(200);
        })
        .end(done);
    });
  });

  describe("On any missing parameter", () => {
    it("Status should be 400 and with error message", (done) => {
        
      let payload = {
        firstName: "",
        lastName: "Singh",
        annualSalary: 60000,
        superRate: "9",
        dateRange: "01 March-31 March",
      };

      request(app)
        .post("/v1/payslip")
        .send(payload)
        .expect("Content-type", "application/json; charset=utf-8")
        .expect((res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(400);
          res.body.message.should.be.a('string');
          res.body.message.should.equal("\"firstName\" is not allowed to be empty");
        })
        .end(done);
    });
  });
  describe("Date range validation on invalid date", () => {
    it("Status should be 400 and with error message", (done) => {
        
      let payload = {
        firstName: "Raghav",
        lastName: "Singh",
        annualSalary: 60000,
        superRate: "9",
        dateRange: "01 ABC-31 March",
      };

      request(app)
        .post("/v1/payslip")
        .send(payload)
        .expect("Content-type", "application/json; charset=utf-8")
        .expect((res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(400);
          res.body.message.should.be.a('string');
          res.body.message.should.equal("\"value\" failed custom validation because Invalid start date.");
        })
        .end(done);
    });
  });

  describe("Date range validation on without end date.", () => {
    it("Status should be 400 and with error message", (done) => {
        
      let payload = {
        firstName: "Raghav",
        lastName: "Singh",
        annualSalary: 60000,
        superRate: "9",
        dateRange: "01 MAY",
      };

      request(app)
        .post("/v1/payslip")
        .send(payload)
        .expect("Content-type", "application/json; charset=utf-8")
        .expect((res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(400);
          res.body.message.should.be.a('string');
          res.body.message.should.equal("\"value\" failed custom validation because month should be same.");
        })
        .end(done);
    });
  });

  describe("Date range validation on invalid date which is greater then current date.", () => {
    it("Status should be 400 and with error message", (done) => {
        
      let payload = {
        firstName: "Raghav",
        lastName: "Singh",
        annualSalary: 60000,
        superRate: "9",
        dateRange: "01 MARCH 2022-30 MARCH 2025",
      };

      request(app)
        .post("/v1/payslip")
        .send(payload)
        .expect("Content-type", "application/json; charset=utf-8")
        .expect((res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(400);
          res.body.message.should.be.a('string');
          res.body.message.should.equal("\"value\" failed custom validation because end date should not be greater then current date.");
        })
        .end(done);
    });
  });
  
  describe("Date range validation on current month date.", () => {
    it("Status code should be 400 and with error message", (done) => {
        
      let payload = {
        firstName: "Raghav",
        lastName: "Singh",
        annualSalary: 60000,
        superRate: "9",
        dateRange: "01 JULY-30 JULY",
      };

      request(app)
        .post("/v1/payslip")
        .send(payload)
        .expect("Content-type", "application/json; charset=utf-8")
        .expect((res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(400);
          res.body.message.should.be.a('string');
          res.body.message.should.equal("\"value\" failed custom validation because Current month has not completed yet. Please try with previous months.");
        })
        .end(done);
    });
  });
});
