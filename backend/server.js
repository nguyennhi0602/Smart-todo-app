'use strict';
require('reflect-metadata');

const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { ValidationPipe } = require('@nestjs/common');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { AppModule } = require('./dist/app.module');
const { HttpExceptionFilter } = require('./dist/filters/http-exception.filter');

const server = express();

const ready = (async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CLIENT_ORIGIN || '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.init();
})();

module.exports = async (req, res) => {
  await ready;
  server(req, res);
};
