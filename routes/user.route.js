import express from 'express'
import { getAllUsers, getSingleUser, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getSingleUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;