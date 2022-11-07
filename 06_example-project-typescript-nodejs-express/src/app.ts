// instead of using types express.Request etc. later, import directly concrete types that were installed via npm
import express, { Request, Response, NextFunction } from 'express';
// middleware that parses all incoming requests and extracts any json data it finds in there 
// to then populate the body key on req obj (-> req.body) with parsed json data
import { json } from 'body-parser';
import todoRoutes from './routes/todos';

const app = express();

app.use(json());
// all requests of imported todoRoutes are available on '/todos/...'
app.use('/todos', todoRoutes);
// error handling middleware function
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: err.message});
})

app.listen(3000);