import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { times, random } from 'lodash';
import { requireAdmin, requireVolunteer, notDuringGameplay, NonEmptyString, PositiveNumber } from '../imports/method-helpers.js';
import { sendTickets } from '../imports/sendTickets';
import {
  sendReports,
  sendUsersAndTeams,
  downloadReport,
} from '../imports/sendReports';
import { cloneDeep, omit, sum } from 'lodash';

Meteor.methods({
  'admin.transactions.resend'(tx, boughtBy) {
    check(tx, NonEmptyString);
    check(boughtBy, NonEmptyString);
    requireAdmin();
    if (!Meteor.isServer) return true;

    sendTickets(tx, boughtBy);
  },

  'admin.sendReport'() {
    if (Meteor.isClient) return;
    requireAdmin();
    const user = Meteor.users.findOne(this.userId);
    return sendReports(user.email);
  },

  'admin.sendUsersAndTeams'() {
    if (Meteor.isClient) return;
    requireAdmin();
    const user = Meteor.users.findOne(this.userId);
    return sendUsersAndTeams(user.email);
  },

  'admin.downloadReport'(index) {
    if (Meteor.isClient) return;
    check(index, Number);
    requireAdmin();
    const ret = downloadReport(index);
    if (!ret) {
      throw new Meteor.Error(400, "Invalid report requested or other error");
    }
    return ret;
  },

});

if (Meteor.isServer) {

  function createTestUserObject(userUnique){
    const accountType = random(0, 1) ? 'STUDENT' : 'NONSTUDENT';
    const photoPermission = random(0, 100) > 10;
    const email = `${userUnique}@example.com`;
    const age = random(7, 70);
    return {
      firstname: `first_${userUnique}`,
      lastname: `last_${userUnique}`,
      email,
      password: `testtest`,
      confirmPassword: `testtest`,
      accountType,
      age,
      phone: '111-222-3333',
      address: '1234 Fake St',
      city: 'Cool City',
      state: 'WA',
      zip: '98055',
      ecName: 'ICE name here',
      ecRelationship: 'Reliable friend',
      ecPhone: '222-333-4444',
      ecEmail: `${userUnique}_ICE@example.com`,
      parentGuardian: age < 14 ? `${userUnique} Parent Name` : "",
      photoPermission,
      holdHarmless: true,
      coords: "",
    }
  }

  function makeTestUser(userUnique) {
    const data = createTestUserObject(userUnique);
    const userId = Accounts.createUser(data);
    Accounts.addEmail(userId, email, true /* or randomly not verified: (random(0, 1) > .5) */);
    return userId;
  }

  Meteor.methods({
    'admin.test.makeUser'(){
      let user = createTestUserObject(`solo${random(10)}`);
      Meteor.call('user.register', user);
    },
    'admin.test.makeTeams'(teamCount) {
      check(teamCount, Number);
      if (!Meteor.isServer) return true;

      if (process.env.NODE_ENV !== 'development' || !Meteor.isServer) {
        throw new Meteor.Error(400, 'This method is unavailable');
      }

      const divisions = [
        'wwu-students',
        'wwu-alumni',
        'postsecondary',
        'secondary',
        'open',
      ];

      // Create Team Iteration
      times(teamCount, (i) => {
        const userCount = random(2, 6);
        const users = new Array(userCount);

        // Create Team's Users Iteration
        times(userCount, (j) => {
          users[j] = makeTestUser(`team${i}_user${j}`);
        });

        // Create some solo users
        times(random(1,3), (j) => {
          makeTestUser(`solo_user_${i}${j}`);
        });

        const now = new Date();
        const team = {
          name: `GPH Test Team ${i}`,
          password: 'testtest',
          owner: users[0],
          createAt: now,
          updatedAt: now,
          destination: '',
          members: users,
          lfm: (userCount < 6),
          division: divisions[random(0,divisions.length)],
        };

        // Create the Team
        const newTeamId = Teams.insert(team, (err) => {
          if (err) {
            throw new Meteor.Error(err.reason);
          }
        });

        const teamOptions = {
          $set: {
            "teamId": newTeamId,
            "updatedAt": new Date(),
          },
        };

        // Update all users to have this teamId.
        Meteor.users.update({ _id: { $in: users } }, teamOptions, { multi: true });
        Meteor.logger.info(`Created team ${i} (${newTeamId}) with ${userCount} member(s)`);
      });
    },

    'admin.test.reset'() {
      if (!Meteor.isServer) return true;
      if (process.env.NODE_ENV !== "development" || !Meteor.isServer) {
        throw new Meteor.Error(400, 'This method is unavailable');
      }

      // Remove Users and Teams
      const usersResult = Meteor.users.remove({
        /* Kind of a hacky solution to prevent the admin user from being deleted
           It would be better to skip users who have the 'admin' role, but it's
           hard to set up the query on an array in that way (that I could find) */
        "firstname": { $not: /^Noah/ }
      });
      const teamsResult = Teams.remove({});

      Meteor.logger.info(`Removed ${usersResult} users...`);
      Meteor.logger.info(`Removed ${teamsResult} teams...`);
    },

    // 'admin.test.resetPuzzles'() {
    //   Teams.update({}, {
    //     $unset: {
    //       currentPuzzle: true,
    //       puzzles: true
    //     },
    //     $set: {
    //       hasBegun: false
    //     }
    //   }, {
    //     multi: true
    //   });

    //   const puzzles = Puzzles.find().fetch();
    //   const puzzleCopies = puzzles.map(teamPuzzleCopy);

    //   return Teams.update({
    //     puzzles: { $exists: false }
    //   }, {
    //     $set: {
    //       puzzles: puzzleCopies,
    //       currentPuzzle: null,
    //     }
    //   }, {
    //     multi: true,
    //   });
    // },

  });
}
