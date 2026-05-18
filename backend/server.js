'use strict';
require('reflect-metadata');

const express = require('express');
const server = express();

let initError = null;
let initialized = false;

(async () => {
  try {
    const { NestFactory } = require('@nestjs/core');
    const { ValidationPipe } = require('@nestjs/common');
    const { ExpressAdapter } = require('@nestjs/platform-express');
    const { AppModule } = require('./dist/app.module');
    const { HttpExceptionFilter } = require('./dist/filters/http-exception.filter');

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('api');
    app.enableCors({ origin: process.env.CLIENT_ORIGIN || '*' });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
    initialized = true;
  } catch (e) {
    initError = e;
  }
})();

module.exports = async (req, res) => {
  if (initError) {
    return res.status(500).json({ error: initError.message, stack: initError.stack });
  }
  if (!initialized) {
    return res.status(503).json({ error: 'Initializing' });
  }
  server(req, res);
};
