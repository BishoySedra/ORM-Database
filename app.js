import Express from 'express'
import { connectDB } from './DB/connection.js';
import dotenv from 'dotenv';
import user from './DB/models/user.js';

// routes
import userRouter from './routes/user.js';

dotenv.config();

const app = Express();

app.use(Express.json());
connectDB();

app.use(userRouter);

const port = 8080;
app.listen(port, () => console.log(`server running on port ${port}`));