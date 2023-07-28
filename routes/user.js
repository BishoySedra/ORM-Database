import { Router } from "express";
import * as userControllers from '../controllers/user.js';
import validate from "../validators/validation.js";
import * as userSchemas from "../validators/schemas/user.js";

const router = Router();

router.post('/users/add', validate(userSchemas.registerSchema), userControllers.addUser);
router.delete('/users/delete/:id', userControllers.deleteUser);
router.patch('/auth/forget-password', userControllers.forgetPassword);
router.patch('/auth/verify-forget-password', userControllers.verifyForgetPassword);
router.patch('/auth/change-password', userControllers.changePassword);

export default router;