import { NextFunction, Request, Response } from 'express';
import PayslipService from './service';
import { HttpError } from '../../config/error';
import { IPayslipModel } from './model';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function payslipGenerator(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const payslip: IPayslipModel = await PayslipService.payslip(req.body);
        res.status(200).send(payslip);
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message,
        });
    }
}
