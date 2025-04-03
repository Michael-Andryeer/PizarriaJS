import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import 'express-async-errors';
import path from 'path';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// Middleware de erro corrigido
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof Error) {
    response.status(400).json({
      error: error.message
    });
  } else {
    response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

// Usando o middleware de erro
app.use(errorHandler);

app.listen(3333, () => console.log('Server is running on port 3333'));