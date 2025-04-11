import express from 'express';
//replaced with kubios 

//import {getMe, login} from '../controllers/auth-controller.js';
import {getMe, login} from '../controllers/kubios-auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const authRouter = express.Router();

// post to /api/auth/login
authRouter.post('/login', login);
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
