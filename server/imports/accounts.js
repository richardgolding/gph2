import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { registrationInfoHTML, questions, signature } from '../../lib/imports/emails';

import { extend, omit } from 'lodash';

const { siteName, eventYear, siteURL, accountsEmail } = Meteor.settings.public;

// Customize Email Verification email
Accounts.emailTemplates.from = accountsEmail;
Accounts.emailTemplates.siteName = siteName;

Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return `${siteName} Email Verification`;
    },
    html(user, url) {
        return `
<p>Hi ${user.firstname}!</p>
<p>Please verify your email (${user.getEmail()}) by <a target="_blank" href='${url}'>clicking here</a>.</p>
${questions}
${registrationInfoHTML}
${signature}
`;
    }
};

Accounts.emailTemplates.resetPassword = {
    subject(user) {
        return `${siteName} Password Reset Request`;
    },
    html(user, url) {
        return `
<p>Hi ${user.firstname}!</p>
<p>You may reset your password by <a target="_blank" href='${url}'>clicking here</a>.</p>
${questions}
${signature}
`;
    }
};

Accounts.validateLoginAttempt((attempt) => {
  if (!attempt.allowed) {
    return false;
  }
  else if (attempt.user && !attempt.user.emails[0].verified) {
    throw new Meteor.Error(400, 'You must verify your email before logging in!  Questions? See our Contact page.');
  }
  else {
    return true;
  }
});

// Extending Account Creation
Accounts.onCreateUser((options, user) => {

  // email and password get set specially, take all other options and
  // set them directly on the user document.
  user = extend(user, omit(options, ['email', 'password', 'confirmPassword']));
  const now = new Date();
  user.createdAt = now;
  user.updatedAt = now;

  return user;
});
