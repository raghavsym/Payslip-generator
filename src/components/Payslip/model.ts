/**
 * @export
 * @interface IPayslipModel
 */
export interface IPayslipModel {
  firstName: string;
  lastName: string;
  annualSalary: string;
  superRate: string;
  dateRange: string;
}

/**
 * @export
 * @interface IPayslipCalculationModel
 */
export interface IPayslipCalculationModel {
  name: string;
  payPeriod: string;
  grossIncome: number;
  incomeTax: number;
  super: number;
  netIncome: number;
  financialYearCycle: string;
  financialMonth: string;
}
