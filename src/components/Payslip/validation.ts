import * as Joi from "joi";
import { IPayslipModel } from "./model";
import * as momemt from "moment";

/**
 * @export
 * @class PayslipValidation
 * @extends Validation
 */
class PayslipValidation {
  /**
   * Creates an instance of PayslipValidation.
   * @memberof PayslipValidation
   */
  constructor() {
    // super();
  }

  /**
   * @param {IPayslipModel} params
   * @returns {Joi.ValidationResult}
   * @memberof PayslipValidation
   */
  payslipInfo(params: IPayslipModel): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      annualSalary: Joi.number().positive().required(),
      superRate: Joi.string().required(),
      dateRange: Joi.string().required(),
    })
    .custom((obj)=>{
        if(obj && obj.dateRange){
            let date = obj.dateRange.split('-');
            let startDate = date && date[0] && momemt(date[0]);
            let endDate = date && date[1] && momemt(date[1]);
            let currentDate = new Date();

            if(startDate && !startDate.isValid()){
                throw new Error('Invalid start date.');
            }
            if(endDate && !endDate.isValid()){
                throw new Error('Invalid end date.');
            }
            if(momemt(endDate) < momemt(startDate)){
                throw new Error('end date should be greater then start date.');
            }
            if(momemt(currentDate) < momemt(startDate)){
                throw new Error('start date should not be greater then current date.');
            }
            if(momemt(currentDate) < momemt(endDate) ){
                throw new Error('end date should not be greater then current date.');
            }
            if((momemt(startDate).month() !== momemt(endDate).month())){
                throw new Error('month should be same.');
            }
            if((momemt(date[1], 'DD MMM YYYY').year() !== momemt(date[0], 'DD MMM YYYY').year())){
                throw new Error('year should be same.');
            }
            if((momemt(currentDate).month() + 1 === momemt(startDate).month() + 1) && (momemt(currentDate).year() === momemt(date[0], 'DD MMM YYYY').year())){
                throw new Error('Current month has not completed yet. Please try with previous months.');
            }
        }
        return obj;
    })

    return schema.validate(params);
  }
}

export default new PayslipValidation();
