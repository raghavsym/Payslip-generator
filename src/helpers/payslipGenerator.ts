import { IPayslipModel } from "../components/Payslip/model";
import * as utils from "../utils/calculationUtility";
import taxBracket from "./taxBracket";

export default class PayslipGenerator {
  public payslipInfo: any;

  constructor(payslipInfo: IPayslipModel) {
    this.payslipInfo = payslipInfo;
  }

  /**
   * @desc Get the payslip component calculation
   * @returns {obj}
   */
  public async payslip() {
    const { firstName, lastName, annualSalary, dateRange } = this.payslipInfo;
    
    let superRate = parseInt(this.payslipInfo.superRate.replace(/%/g, ''));

    const financialYear = utils.getFinancialYear(dateRange, taxBracket);
    const financialMonth = utils.getPayPeriodMonth(dateRange);
    const financialTaxBracket = utils.getFinancialYearTaxBracket(taxBracket, financialYear);
    const taxRate = utils.getTaxRate(financialTaxBracket, annualSalary);
    const financialYearCycle = utils.getPayPeriod(dateRange, financialYear);

    const grossIncome = Math.round(annualSalary / 12);
    const incomeTax = utils.incomeTax(taxRate, annualSalary);
    const netIncome = grossIncome - incomeTax;
    const superRateIncome = Math.round((grossIncome * superRate)/100);

    return {
      name: firstName+' '+lastName,
      payPeriod: dateRange,
      grossIncome: grossIncome,
      incomeTax: incomeTax,
      super: superRateIncome,
      netIncome: netIncome,
      financialYearCycle: financialYearCycle,
      financialMonth: financialMonth
    }
  }

  /**
   * @desc Create the payslip HTML with calculation response. 
   * @param result 
   * @returns 
   */
  public async createPayslip(result: any) {
    const name = result.name;
    const payPeriod = result.financialMonth;
    const incomeTax = result.incomeTax;
    const netIncome = result.netIncome;
    const superRate = result.super;
    const grossIncome = result.grossIncome;
    const financialYearCycle = result.financialYearCycle;
    return `<div class="container" style="border: 1px solid black;margin: auto;width: 50%;padding: 10px;font-family: sans-serif;"> <div class="row"> <div class="col-md-12"> <div class="text-center" style="text-align: center;font-size: 20px;"> <h3 class="fw-bold">Payslip</h3> <span class="fw-normal">Payment slip for the month of ${payPeriod}</span><p class="fw-normal">Financial year (${financialYearCycle})</p> </div> <div class="row"> <div class="col-md-10"> <div class="row"> <div class="col-md-6" style="padding: 50px 10px 10px 45px;"> <div> <span style="font-weight: 600; font-size: 20px;">EMP Name</span> <span>${name}</span> </div> </div> </div> </div> <table style="margin: auto; border: 1px solid black;font-size: 20px;"> <thead class="bg-dark text-white"> <tr> <th scope="col" style="background: black;color: white;">Earnings</th> <th scope="col" style="background: black;color: white;">Amount</th> <th scope="col" style="background: black;color: white;">Deductions</th> <th scope="col" style="background: black;color: white;">Amount</th> </tr> </thead> <tbody> <tr> <td style="border: 1px solid grey;text-align: left;" >Gross income</td> <td style="border: 1px solid grey;text-align: center;">${grossIncome}</td> <td style="border: 1px solid grey;text-align: left;">Income tax</td> <td style="border: 1px solid grey;text-align: center;">${incomeTax}</td> </tr> <tr> <td style="border: 1px solid grey;text-align: left;">Super rate </td> <td style="border: 1px solid grey;text-align: center;">${superRate}</td> </tr> </tbody> </table> </div> <div class="row"> <div class="col-md-4"> <br> <span style="padding: 50px 10px 10px 45px;font-weight: 600;font-size: 20px;">Net Pay : ${netIncome}</span> </div> </div> </div> </div> </div>`
  }

}
