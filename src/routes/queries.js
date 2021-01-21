const express = require('express');
const { body } = require('express-validator/check');
const {createQuery, getQueries} = require('../controllers/queries');

const router = new express.Router();

router.post(
  '/queries',
  [
    body('query')
      .trim()
      .isLength({ min: 1 })
  ],
  createQuery
);

router.get('/queries', getQueries)

module.exports = router;
