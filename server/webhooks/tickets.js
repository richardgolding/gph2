import { Meteor } from 'meteor/meteor';

import { PostRoute } from '../imports/route-types.js';
import processTransaction from '../imports/processTransaction.js';
import { convertCashnet } from '../../lib/imports/convertCashnet';

const accts = Meteor.settings.accounts || {};
const { token } = accts;

PostRoute.route('/api/tickets', function(params, req, res, next) {
  Meteor.logger.info(`Request on "/api/tickets" from ${Meteor.logger.jstring(req.headers)}`);
  Meteor.logger.info(params);
  const req_token = params.query.token;

  handleRequest(req, res, req_token, req.body);
});

const handleRequest = async (req, res, req_token, body) => {
  Meteor.logger.info("Logging raw transaction");
  Meteor.logger.info(body);
  res.setHeader('Content-Type', 'application/json');
  /* Validate Token */
  if (!req_token || req_token !== token) {
    Meteor.logger.info(`Request on "/api/tickets" with BAD TOKEN: "${req_token}" from ${Meteor.logger.jstring(req.headers)}`);
    res.statusCode = 403;
    res.write('{ "error": "Invalid token" }');
    return res.end();
  }

  /* Parse request and formulate response */
  try {
    let txData = convertCashnet(body);
    await processTransaction(txData);
    res.statusCode = 200;
    res.end();
  } catch (err) {
    Meteor.logger.error("Failed to convert or process CashNet request");
    Meteor.logger.error(err);
    const msg = "Unable to parse request";
    return badResponse(res, msg);
  }
};

const badResponse = (res, message) => {
  Meteor.logger.info(`Request on "/api/tickets" with bad data`);
  body = {
    error: "Invalid data",
    details: message,
  };

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 403;
  res.write(JSON.stringify(body));
  return res.end();
}