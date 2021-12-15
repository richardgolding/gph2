import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';

export function requireAdmin() {
  requireAccess('admin');
}

export function requireVolunteer() {
  requireAccess('volunteer');
}

function requireAccess(level) {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error(400, 'You must be logged in');
  }

  const user = Meteor.users.findOne(userId);
  if (!user || !user.hasRole(level)) {
    throw new Meteor.Error(400, 'You do not have permission to do that!');
  }

  return userId;
}

export function isAdmin(userId) {
  if (!userId) {
    return false;
  }

  const user = Meteor.users.findOne(userId);
  return user && user.hasRole('admin');
}

export function isVolunteer(userId) {
  if (!userId) {
    return false;
  }

  const user = Meteor.users.findOne(userId);
  return user && user.hasRole('volunteer');
}

export function checkMinLength(length) {
  return Match.Where((x) => {
    check(x, String);
    return x.length >= length;
  });
};

export const NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});

export function requirePattern(val, pattern, message) {
  const pass = Match.test(val, pattern);
  if (pass) return true;
  throw new Meteor.Error(400, message);
}

// This can only be used in Meteor Methods
export function requireUser() {
  if (!Meteor.userId()) {
    throw new Meteor.Error(403, 'You must be logged in');
  }
  return true;
}

export function notDuringGameplay() {
  const gamestate = Gamestate.findOne();
  if (gamestate.gameplay) {
    throw new Meteor.Error(400, "Sorry, you can't do that during Gameplay!");
  }
}

export function notAfterCheckIn() {
  const userId = requireAccess('user');
  const team = Teams.findOne({members: userId});
  if (!team) {
    throw new Meteor.Error(400, "Error! No Team found for user!");
  }
  if (team.checkinConfirmed) {
    throw new Meteor.Error(400, "Oops! You cannot do that after check in has been confirmed!");
  }
}

export function makeName(firstname, lastname) {
  const first = firstname || "";
  const last = lastname || "";
  return `${first.charAt(0).toUpperCase()}${first.slice(1)} ${last.charAt(0).toUpperCase()}${last.slice(1)}`;
}

// Check Helpers
export const BooleanTrue = Match.Where((x) => {
  check(x, Boolean);
  return x === true;
});

export const nonDigits = /\D/g;

export const StringPhoneNumber = Match.Where((x) => {
  check(x, String);
  return x.replace(nonDigits, '').length === 10;
});

export const PositiveNumber = Match.Where((x) => {
  return parseInt(x) > 0;
});

export function checkMsg(value, pattern, message){
  if (typeof message === "undefined"){
    check(value, pattern);
  } else {
    try {
      check(value, pattern);
    } catch(e) {
      throw new Match.Error(message);
    }
  }
}
