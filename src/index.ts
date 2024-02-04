import express, {Express} from 'express'
import dotenv from "dotenv";
import { AppDataSource } from './database';
import authRouter from './routes/auth-route';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware';


dotenv.config();

const app: Express = express();

app.use(express.json());
// app.use(cors());

app.use('/api/v1/auth', authRouter)

app.use(errorHandlerMiddleware)

const port = process.env.NODE_APPLICATION_PORT || 3000;
app.listen(port, () => {

  console.log(`[server]: Server is running at http://localhost:${port}`);
  
  AppDataSource.initialize().then(()=>{

    console.log(`[db]: db connected successfully`);

  }).catch((error) => console.log(error))
});
