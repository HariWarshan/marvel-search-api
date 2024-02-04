import express, {Express} from 'express'
import dotenv from "dotenv";
import AppDataSource from './database';
import authRouter from './routes/auth-route';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware';
import marvelRouter from './routes/marvel-route';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/marvel', marvelRouter)

app.use(errorHandlerMiddleware)

const port = process.env.NODE_APPLICATION_PORT || 3000;

app.listen(port, () => {

  console.log(`[server]: Server is running at http://localhost:${port}`);
  
  AppDataSource.initialize().then(()=>{

    console.log(`[db]: db connected successfully`);

  }).catch((error) => console.log(error))
});
