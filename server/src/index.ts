import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from '@/routes';

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (_req: Request, res: Response) => res.send("Hello, World!!"));

app.use('/api', routes)

app.listen(port, () => console.log(`Server running at localhost:${port}`));