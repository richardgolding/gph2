import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import bodyParser from 'body-parser';

/************************************************
* Setup Winston Logger
************************************************/
const { createLogger, transports, format } = require('winston');
const Transport = require('winston-transport');
const logger = createLogger({
    transports: [new transports.Console()]
});

/* const logger = require('winston'); */

logger.logobj = function logobj(obj, level) {
  level = level || 'info';
  logger[level](JSON.stringify(obj, null, 2));
};

logger.jstring = function(obj) {
  return JSON.stringify(obj, null, 2);
}

Meteor.logger = logger;

/************************************************
* Add body parser
************************************************/
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: true }));

import './imports/start-up';
import './imports/accounts';
import './imports/puzzle-watcher';
import './imports/autoSendReports';
