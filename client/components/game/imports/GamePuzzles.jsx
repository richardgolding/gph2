import { Meteor } from 'meteor/meteor';
// import React, { Component, PropTypes } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

import GamePuzzle from './GamePuzzle';

export default class GamePuzzles extends Component {
  render() {
    const { team } = this.props;
    return (
      <Grid.Row columns='1'>
        <Grid.Column>
          <Header as='h2' content='Your Puzzles' style={{marginTop: "10px"}} />
          { this._renderPuzzles() }
        </Grid.Column>
      </Grid.Row>
    );
  }

  _renderPuzzles() {
    const { team, user } = this.props;
    return team.puzzles.map((puzzle) => <GamePuzzle
      team={ team }
      user={ user }
      puzzle={ puzzle }
      key={ puzzle.puzzleId }
    />);
  }
}

GamePuzzles.propTypes = {
  team: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
