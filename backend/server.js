'use strict';

let result;
try {
  require('reflect-metadata');
  const express = require('express');
  const { AppModule } = require('./dist/app.module');
  result = { ok: true, module: typeof AppModule };
} catch (e) {
  result = { error: e.message, code: e.code };
}

module.exports = (req, res) => {
  res.json(result);
};
