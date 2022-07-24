import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import PayslipRouter from './PayslipRoutes';


/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * @description
     *  Forwards any requests to the /v1/payslip URI to our PayslipRouter
     * @constructs
     */
    app.use('/v1/payslip', PayslipRouter);

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
