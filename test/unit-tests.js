const chai = require("chai");
const expect = require("chai").expect;
const Utility = require("../src/utils/calculationUtility");
const payslipInfo = require("./fixtures/payslipInfo.json");
const taxBracket = require("../src/helpers/taxBracket").default;
const PayslipGenerator = require("../src/helpers/payslipGenerator").default;
chai.should();

/**
 * Payslip API unit tests
 */
describe("Payslip API service unit testing", () => {
  it("Should return all payslip parameters", async () => {
    const payslipGenerator = new PayslipGenerator(payslipInfo);
    const payslipAttributes = await payslipGenerator.payslip();
    expect(payslipAttributes).to.have.property("name");
    expect(payslipAttributes).to.have.property("grossIncome");
    expect(payslipAttributes).to.have.property("incomeTax");
    expect(payslipAttributes).to.have.property("super");
    expect(payslipAttributes).to.have.property("netIncome");
    expect(payslipAttributes).to.have.property("financialYearCycle");
    expect(payslipAttributes).to.have.property("financialMonth");
  });

  it("Should return payslip HTML content", async () => {
    const payslipGenerator = new PayslipGenerator(payslipInfo);
    const payslipAttributes = await payslipGenerator.payslip();
    const payslipHTML = await payslipGenerator.createPayslip(payslipAttributes);
    expect(payslipHTML).to.include('<div class="row">');
    expect(payslipHTML).not.to.be.empty;
  });
});

describe("Payslip API calculation unit testing", () => {
  describe("Get financial year period for March", () => {
    it("Should return financial start and end year of last cycle", async () => {
      const dateRange = "01 March-31 March";

      const result = Utility.getPayPeriod(dateRange, taxBracket);
      expect(result).to.be.a("string");
      expect(result).to.be.equal("2021 - 2022");
    });
  });

  describe("Get financial year period for July", () => {
    it("Should return financial start and end year of current cycle", async () => {
      const dateRange = "01 July-31 July";

      const result = Utility.getPayPeriod(dateRange, taxBracket);
      expect(result).to.be.a("string");
      expect(result).to.be.equal("2022 - 2023");
    });
  });

  describe("Get financial year", () => {
    it("Should return financial year 2017 - 2018", async () => {
      const dateRange = "01 March 2018-31 march 2018";

      const result = Utility.getFinancialYear(dateRange, taxBracket);
      expect(result).to.be.a("string");
      expect(result).to.be.equal("2017");
    });
    it("Should return financial year as default if it does not exist in taxBracket", async () => {
      const dateRange = "01 March-31 March";

      const result = Utility.getFinancialYear(dateRange, taxBracket);
      expect(result).to.be.a("string");
      expect(result).to.be.equal("default");
    });
    it("Should return financial year default", async () => {
      const dateRange = "01 July 2018-31 July 2018";

      const result = Utility.getFinancialYear(dateRange, taxBracket);
      expect(result).to.be.a("string");
      expect(result).to.be.equal("default");
    });
  });

  describe("Get tax rate bracket", () => {
    it("Should return appropriate tax bracket", async () => {
      const annualSalary = 55000;

      const result = Utility.getTaxRate(taxBracket["default"], annualSalary);
      expect(result).to.be.a("object");
      expect(result).to.have.property("minSalary");
      expect(result).to.have.property("maxSalary");
      expect(result).to.have.property("incomeTax");
      expect(result).to.have.property("taxPerDollar");
      expect(result.incomeTax).to.be.equal(3572);
    });
  });

  describe("Get Income tax", () => {
    it("Should return income tax", async () => {
      const taxrate = {
        minSalary: 37001,
        maxSalary: 87000,
        incomeTax: 3572,
        taxPerDollar: 0.325,
      };
      const annualSalary = 55000;

      const result = Utility.incomeTax(taxrate, annualSalary);
      expect(result).to.be.a("number");
      expect(result).to.be.equal(785);
    });
  });
});
