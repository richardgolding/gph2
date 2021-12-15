import { Meteor } from 'meteor/meteor';
// import React, { Component, PropTypes } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Message, Header, Statistic, Progress } from 'semantic-ui-react';

import { renderScore } from '../../imports/PuzzleProgress';
import { getFinalScore } from '../../../../lib/imports/puzzle-helpers';

const { eventYear } = Meteor.settings.public;

class GameStats extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(props) {
    const newState = this._stateFromProps(props);
    if (newState.finished !== this.state.finished) {
      Meteor.setTimeout(() => $('.ui.button.scroll-top-btn').click(), 1500);
    }
    this.setState(newState);
  }

  _stateFromProps(props) {
    const { team } = props;
    const puzzlesSolved = team.puzzles.reduce((acc, p) => (acc + (p.score ? 1 : 0)), 0);
    return {
      puzzlesSolved,
      finished: team.puzzles.length === puzzlesSolved,
    };
  }

  render() {
    const { team } = this.props;
    const { puzzlesSolved, finished } = this.state;
    const { time, minutes } = renderScore(getFinalScore(team));
    return (
      <Message info={!finished} positive={finished}>
        {/* virtualeventonly
        {puzzlesSolved > 0 ? null : <Header as="h4" content="Starting Puzzle"/>}
        {puzzlesSolved > 0 ? null : <p>{team.startLocation}</p>}
        */}

        <Header as="h4" content="Puzzles Solved" />
        <p>{puzzlesSolved} of {team.puzzles.length}</p>

        <Header as="h4" content="Total Score" />
        <p>
          {time} <br/>
          ({minutes} minutes)
        </p>

        { this._doneMessage() }
      </Message>
    );
  }

  _doneMessage() {
    const { finished } = this.state;
    if (!finished) return null;
	// virtualeventonly: head back to Red Square, not tune into webcast
    return (
      <Header as='h3'
        content={`Congratulations! You've finished the ${eventYear} Puzzle Hunt!`}
        subheader="Tune back into the webcast by 5pm PT for prizes."
      />
    );
  }

}

GameStats.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameStats;
