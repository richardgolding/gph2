// import React, { Component, PropTypes } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Statistic } from 'semantic-ui-react';
import moment from 'moment';

class GameCountdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
      interval: Meteor.setInterval(() => this.setState({ now: moment() }), 1000),
    };
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.state.interval);
  }

  render() {
    const timeToStart = moment('2021-04-17T10:30:00-07:00').from(this.state.now, true);
    return (
      <Message info>
        <Message.Header>The Hunt has not started yet!</Message.Header>
        <Message.Content>
          <br/>
          <Statistic>
            <Statistic.Label>Starting In</Statistic.Label>
            <Statistic.Value>{ timeToStart }</Statistic.Value>
          </Statistic>
        </Message.Content>
      </Message>
    );
  }
}

GameCountdown.propTypes = {
};

export default GameCountdown;
