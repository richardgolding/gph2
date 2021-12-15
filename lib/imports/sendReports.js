import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { sortBy } from 'lodash';

const { siteName, accountsEmail, eventYear, siteURL } = Meteor.settings.public;

function localizeCreatedAt(item){
    // Convert to local time so these times line up with CashNet report,
    // and remove the ',' so it takes only one cell in the spreadsheet.
    item.createdAt = new Date(item.createdAt).toLocaleString(
      'en-US',
      { timeZone: 'America/Vancouver' }
    ).replace(",", "");
}

function getShippingInfoArray(tx){
  tx = tx || {};
  const shipping = tx.shippingInfo || {};
  return [
    shipping.name,
    shipping.addr1,
    shipping.addr2,
    shipping.city,
    shipping.state,
    shipping.zip,
    shipping.country,
    shipping.internationalCount,
    shipping.internationalTotal,
  ];
}

function cleanUpCellValues(row){
  return row.map(value => {
    if (typeof value === typeof "" && value.includes(",")){
      return value.replace(/,/g, " ");
    }
    if (value === false) return "FALSE";
    if (value === null) return "NULL";
    return value || "";
  });
}

function buildUserReport() {
  const USER_FIELDS = ["createdAt", "firstname", "lastname", "email",
    "accountType", "paid", "ticketUsed", "lookingForTeam", "teamName", "teamDivision",
    "age", "city", "state", "address", "zip", "country", "phone", "ecName",
    "ecRelationship", "ecPhone", "ecEmail", "photoPermission", "holdHarmless"];
  let csv = USER_FIELDS.join(",") + "\n";

  const teams = Teams.find({}).fetch().reduce((acc, team) => {
    acc[team._id] = team;
    return acc;
  }, {});

  Meteor.users.find({}, {sort: {"createdAt": 1}}).forEach(item => {
    localizeCreatedAt(item);
    item.teamName = "";
    item.teamDivision = "";
    if (item.teamId) {
      const team = teams[item.teamId];
      item.teamName = team.name;
      item.teamDivision = team.division;
    }

    csv += cleanUpCellValues(
      USER_FIELDS.map(field => item[field])
    ).join(",") + "\n";
  });

  return {
    filename: "users.csv",
    content: csv,
    encoding: "utf-8"
  };
}

function buildTransactionReport() {
  const TX_FIELDS = ["createdAt", "tx", "name", "email", "studentTickets",
    "nonStudentTickets", "countGearItems"];
  let csv = TX_FIELDS.join(",") + "\n";

  Transactions.find({}, {sort: { "createdAt": 1 }}).forEach(item => {
    localizeCreatedAt(item);
    let gearOrders = item.gearOrders || [];
    item.countGearItems = gearOrders.length;

    csv += cleanUpCellValues(
      TX_FIELDS.map(field => item[field])
    ).join(",") + "\n";
  });

  return {
    filename: "transactions.csv",
    content: csv,
    encoding: "utf-8",
  };
}

function buildGearOrders() {
  const GEAR_ORDER_FIELDS = ["createdAt", "tx", "email", "name", "itemcode",
    "color", "logoColor", "size", "qty", "amount"];

  let csv = GEAR_ORDER_FIELDS.join(",") + ",";
  csv += [ "shipping name", "addr1", "addr2", "city", "state", "zip",
    "country", "intlQty", "intlCost", "numItems"].join(",") + "\n";

  GearOrders.find({}, {sort: {"createdAt": 1}}).forEach((item) => {
    const tx = Transactions.findOne({tx: item.tx}) || {};
    localizeCreatedAt(item);
    item.name = tx.name;

    let row = GEAR_ORDER_FIELDS.map(field => item[field]).concat(
      getShippingInfoArray(tx),
      tx.gearOrders.length,
    );

    csv += cleanUpCellValues(row).join(",") + "\n";
  });

  return {
    filename: `gear_orders.csv`,
    content: csv,
    encoding: 'utf-8',
  };
}

function buildUsersAndTeams() {
  const users = Meteor.users.find({}).fetch();
  const teams = Teams.find({}).fetch().reduce((acc, team) => {
    acc[team._id] = team;
    return acc;
  }, {});

  const usersWithTeams = sortBy(users.map((user) => {
      if (user.teamId) {
        const team = teams[user.teamId];
        user.teamDivision = team.division;
        user.teamName = team.name;
        user.teamIsPlaying = team.hasBegun;
        user.teamSize = team.members.length

        user.checkedIn = Boolean(user.checkedIn);
      }
      return user;
    }), ['division', 'teamName', 'firstname', 'lastname']);

  const fields = [
    "teamDivision", "teamName", "teamIsPlaying",
    "checkedIn", "firstname", "lastname", "phone", "photoPermission",
    "ecName", "ecRelationship", "ecPhone", "ecEmail"
  ];
  let csv = fields.join(",") + "\n";
  usersWithTeams.forEach((user) => {
    csv += fields.map((field) => `"${user[field] || ''}"`).join(",") + "\n";
  });

  return {
    filename: `users_and_teams.csv`,
    content: csv,
    encoding: 'utf-8',
  };
}

export function sendReports(to = null) {
  if (Meteor.isClient) return;
  const now = new Date();
  const sendTo = to || Gamestate.findOne().sendReportsTo;
  const subject = `GPH ${eventYear} Admin Reports ${now}`;
  const html = `
<h3>Admin,</h3>
<p>
Attached are the admin reports for <a href="${siteURL}/admin/users">users</a>, transactions, and gear orders.
</p>

Cheers,
${siteName}
`;

  Meteor.logger.info(`Sending reports to: ${sendTo}`);

  return Email.send({
    from: accountsEmail,
    to: sendTo,
    subject,
    html,
    attachments: [
      buildUserReport(),
      buildTransactionReport(),
      buildGearOrders(),
    ]
  });
};

export function sendUsersAndTeams(to = null) {
  if (Meteor.isClient) return;
  const now = new Date();
  const sendTo = to || Gamestate.findOne().sendReportsTo;
  const subject = `GPH ${eventYear} Admin Report: Users and Teams ${now}`;
  const html = `
<h3>Admin,</h3>
<p>
Attached are the users and teams!
</p>

Cheers,
${siteName}
`;

  Meteor.logger.info(`Sending reports to: ${sendTo}`);

  return Email.send({
    from: accountsEmail,
    to: sendTo,
    subject,
    html,
    attachments: [
      buildUsersAndTeams(),
    ]
  });
};

export function downloadReport(index) {
  switch(index){
    case 0:
      return buildUserReport();
    case 1:
      return buildTransactionReport();
    case 2:
      return buildGearOrders();
    default:
      Meteor.logger.error(`downloadReport: Unknown report number ${index}`);
      return null;
  }
}
