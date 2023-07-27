import { Router } from "express";
import * as userController from '../controllers/user.js';
import validate from "../../middlewares/validation.js";
import * as userSchemas from "../../schemas/user.js";

const router = Router();

router.post('/users/add', validate(userSchemas.registerSchema), userController.addUser);
router.delete('/users/delete/:id', userController.deleteUser);

export default router;