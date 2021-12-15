import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Header, Message, Icon
} from 'semantic-ui-react';

import GamestateComp from '../imports/GamestateComp';
import TeamCheckinMain from './imports/TeamCheckinMain';

const {eventYear} = Meteor.settings.public;

class TeamCheckinInner extends Component {
  render() {
    const { ready, gamestate } = this.props;
    if (!ready) return <Container><Loading /></Container>;

    return gamestate.checkin ? this._renderCheckin() : this._renderCheckinClosed();
  }

  _renderCheckin() {
    return <TeamCheckinMain />
  }

  _renderCheckinClosed() {
    let title = `GPH ${eventYear} Check In`;
    return (
      <Container>
        <PuzzlePageTitle title={title}/>
        <Message icon={<Icon loading name="refresh"/>} info header="Waiting for Check In to open"/>
      </Container>
    );
  }
}

TeamCheckinInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  gamestate: PropTypes.object,
};

TeamCheckin = GamestateComp(TeamCheckinInner);
