import { NextFunction, Request } from 'express';
import * as express from 'express';
import { HttpError } from './index';

interface CustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message ? : string) => void;
}

/**
 *
 * @param error Error
 * @returns {string} HTML response or empty string
 * @description generates HTML for response
 */
const generateHTML: Function = (error: HttpError): string => {
    if (error) {
        return '<div style=\'text-align: center;\'>'
            + `<p>Status: ${error.status}</p>`
            + `<p>Name: ${error.name}</p>`
            + `<p>${error}</p>`
        + '</div>';
    }

    return '';
};

/**
 * @exports
 * @param {Request} req
 * @param {*} res
 * @param {NextFunction} next
 */
export function sendHttpErrorModule(req: Request, res: CustomResponse, next: NextFunction): void {
    res.sendHttpError = (error: HttpError): void => {
        res.status(error.status);
        if (
            req.xhr
            || req.is('json')
            || (req.is('json') && req.get('Accept'))
            || !(req.get('Accept') && req.get('Accept').indexOf('html') !== -1)
        ) {
            res.json({
                status: error.status,
                name: error.name,
                message: error.message,
            });
        } else {
            res.send(generateHTML(error));
        }
    };

    next();
}
