import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Tickets = new Meteor.Collection('tickets');

// Ensure index on ticket code
Meteor.startup(function () {
  if (Meteor.isServer) {
    Tickets._ensureIndex({ tx: 1, code: 1 });
  }
});
