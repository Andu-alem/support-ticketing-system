import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './lib/db-connection';
import authRoute from './routes/auth';
import ticketssRoute from './routes/tickets';
import revalidateRoute from './routes/verify-token';
import { authenticate } from './middlewares/authenticate';


//For env File 
dotenv.config();
connect();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

app.use("/tickets", authenticate, ticketssRoute);
app.use("/verify_token", authenticate, revalidateRoute);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'server is woring' })
});

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});