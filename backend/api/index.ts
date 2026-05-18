import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import type { Request, Response } from 'express';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';

const server = express();

const ready = (async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CLIENT_ORIGIN || '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.init();
})();

export default async function handler(req: Request, res: Response) {
  await ready;
  server(req, res);
}
