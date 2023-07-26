import { Router } from "express";
import * as userController from '../controllers/user.js';

const router = Router();

router.post('/users/add', userController.addUser);

export default router;