import * as Joi from 'joi';
import { IPayslipModel, IPayslipCalculationModel } from './model';
import PayslipValidation from './validation';
import { IPayslipService } from './interface';
import PayslipGenerator from '../../helpers/payslipGenerator';


/**
 * @export
 * @implements {IPayslipModelService}
 */
const PayslipService: IPayslipService = {

    /**
     * @param {object} payslipInfo
     * @returns {Promise < IPayslipModel >}
     * @memberof UserService
     */
    async payslip(body: IPayslipModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PayslipValidation.payslipInfo(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payslipObj = new PayslipGenerator(body);
            // Get payslip calculation
            const calculationResult: IPayslipCalculationModel = await payslipObj.payslip();
            // Create html with calculation response
            return await payslipObj.createPayslip(calculationResult);
        } catch (error) {
            throw new Error(error.message);
        }
    },

};

export default PayslipService;
