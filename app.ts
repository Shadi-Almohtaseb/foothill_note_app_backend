import './config.js';
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from 'cors';
import indexRouter from "./routes/index.js";
import notesRouter from "./routes/notes.js";

const app = express();

app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(err);
});

app.get('*', function (req, res) {
  res.status(404).send('404, Resource Not Found');
});



export default app;
