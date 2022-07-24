import { Router } from 'express';
import { PayslipComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:{PORT}/v1/payslip
 */
router.post('/', PayslipComponent.payslipGenerator);


/**
 * @export {express.Router}
 */
export default router;
