import exp from "constants";
import { func } from "joi";
import * as moment from "moment";

/**
 * Get the financial year by date range,
 * If the startDate is prior to July, it will be returned previous year,
 * from July 1st up to June 30th of next year.
 * If the startDate is from July, it will be returned current year,
 *
 * @param range start date and end date
 * @returns {string} the corresponding rate year
 */
export function getFinancialYear(range: string, taxBracketConfig: any) {
  const LIMIT_MONTH_TAX_PERIOD = 7;
  const date = range.split("-");
  const startDate = date[0];
  const financialYear = moment(startDate, "DD MMM YYYY").year();
  const financialMonth = moment(startDate, "DD MMM YYYY").month();
  let currentFinancialYear: any = "default";

  if (financialMonth + 1 < LIMIT_MONTH_TAX_PERIOD) {
    currentFinancialYear = financialYear - 1;
  } else {
    currentFinancialYear = financialYear;
  }

  if (!taxBracketConfig.hasOwnProperty(currentFinancialYear)) {
    currentFinancialYear = "default";
  }
  return currentFinancialYear.toString();
}
/**
 * To get the financial tax bracket by year
 * @param taxBracketConfig
 * @param financialYear
 * @returns [array]
 */
export function getFinancialYearTaxBracket(
  taxBracketConfig: any,
  financialYear: string
) {
  if (taxBracketConfig.hasOwnProperty(financialYear)) {
    return taxBracketConfig[financialYear];
  }
}
/**
 * To get the tax bracket by salary
 * @param financialTaxBracket
 * @param annualSalary
 * @returns {obj}
 */
export function getTaxRate(financialTaxBracket: any, annualSalary: number) {
  for (let rateObj of financialTaxBracket) {
    if (
      (rateObj.maxSalary === 0 || rateObj.maxSalary >= annualSalary) &&
      rateObj.minSalary <= annualSalary
    ) {
      return rateObj;
    }
  }
  return null;
}

/**
 * To calculate income tax
 * @param taxRate
 * @param annualSalary
 * @returns number
 */
export function incomeTax(taxRate: any, annualSalary: number) {
  const taxPerDollar =
    (annualSalary - taxRate.minSalary) * taxRate.taxPerDollar;
  const tax = Math.round((taxRate.incomeTax + taxPerDollar) / 12);
  return tax;
}

/**
 * To get financial year period
 * @param range
 * @param year
 * @returns string
 */
export function getPayPeriod(range: any, year: string) {
  const LIMIT_MONTH_TAX_PERIOD = 7;
  const date = range.split("-");
  const startDate = date[0];
  const financialMonth = moment(startDate, "DD MMM YYYY").month();
  const financialYear = moment(startDate, "DD MMM YYYY").year();

  if (financialMonth + 1 < LIMIT_MONTH_TAX_PERIOD) {
    return financialYear - 1 + " - " + financialYear;
  } else {
    return financialYear + " - " + (financialYear + 1);
  }
}

/**
 * To get pay slip period.
 * @param range
 * @returns string
 */
export function getPayPeriodMonth(range: any) {
  const date = range.split("-");
  const startDate = date[0];
  const financialMonth = moment(startDate, "DD MMM YYYY").month();
  let datestr = date[0].split(" ");
  let year = datestr[2] ? datestr[2] : moment().format("YYYY");
  return moment().month(financialMonth).format("MMMM") + " " + year;
}
