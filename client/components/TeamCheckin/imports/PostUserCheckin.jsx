import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Header, Icon, Button
} from 'semantic-ui-react';

import TeamMemberCheckIn from './TeamMemberCheckIn';
// virtualeventonly -- change back to QR code for in-person
import TeamCheckInVirtually from './TeamCheckInVirtually';

class PostUserCheckin extends Component {
  render() {
    const { user, team, teamMembers } = this.props;
    return (
      <div>
        <TeamMemberCheckIn team={team} teamMembers={teamMembers}/>
        <TeamCheckInVirtually teamId={user.teamId}/>
      </div>
    );
  }
}

PostUserCheckin.propTypes = {
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  teamMembers: PropTypes.arrayOf(Object).isRequired,
};

export default PostUserCheckin;
