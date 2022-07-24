import { IPayslipModel } from "./model";

/**
 * @export
 * @interface IPayslipService
 */
export interface IPayslipService {
  /**
   * @param {string} payslipModel
   * @returns {Promise<any>}
   * @memberof IPlayslipService
   */
  payslip(payslipModel: IPayslipModel): Promise<any>;
}
