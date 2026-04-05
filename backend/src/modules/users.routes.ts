import express from 'express';
import { createUser, editUser, getUser, getUsers, deleteUser } from './users.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/', protect(["admin"]), createUser);
router.get('/', protect(), getUsers);
router.get('/:id', protect(), getUser);
router.patch('/:id', protect(["admin"]), editUser);
router.delete('/:id', protect(["admin"]), deleteUser);
export default router;