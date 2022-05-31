import {Router} from 'express';
import {createEmployees,getEmployeeById, getEmployees, updateEmployee, deleteEmployee} from '../employee/employeeController';
import { verifyUser, registerUser } from '../user/userController';
const auth = require('../middleware/userAuth')

const router = Router();

router.post('/register', registerUser);

router.post('/login', verifyUser);

router.post('/', auth, createEmployees);

router.get('/:id', auth, getEmployeeById);

router.get('/', auth, getEmployees);

router.patch('/:id', auth, updateEmployee);

router.delete('/:id', auth, deleteEmployee);

export default router;