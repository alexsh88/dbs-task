const fs = require('fs');
const path = require('path');

const { formatResponse } = require('../utils/responseFormat')
const { sendRequest } = require('../utils/HttpRequestUtil')
const { writeToFile, readFromFile } = require('../utils/writeToFIle')


exports.getQueries = async (req, res, next) => {
    readFromFile()
        .then((result) => {
            result = result.toString();
            result = result.replace(/\n/g,',')
            result = result.slice(0, -1)
            result = `[${result}]`;
            res.status(200).json(JSON.parse(result));
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.createQuery = async (req, res, next) => {
  const content = req.body;
  sendRequest(content)
      .then((result) => {
        return formatResponse(result.data);
      }).then((result) => writeToFile(result, content))
    .then((result) => {
      res.status(200).json({
         result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
