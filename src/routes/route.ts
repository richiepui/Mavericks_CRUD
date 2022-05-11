import {Router} from 'express';
import {createEmployees,getEmployeeById, getEmployees, updateEmployee, deleteEmployee} from '../controller/control';

const router = Router();

router.post('/', createEmployees);

router.get('/:id', getEmployeeById);

router.get('/', getEmployees);

router.patch('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

export default router;