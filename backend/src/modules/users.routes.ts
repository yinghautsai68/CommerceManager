import express from 'express';
import { createUser, editUser, getUser, getUsers, deleteUser } from './users.controller';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', editUser);
router.delete('/:id', deleteUser);
export default router;