import Express from 'express';
import { connectionDB } from './DB/connection.js';
import user from './DB/models/user.js';
import userRouter from './modules/routes/user.js';

connectionDB();

const app = Express();

app.use(Express.json());

app.use(userRouter);

const port = 8080;
app.listen(port, () => console.log(`server running on ${port}`));