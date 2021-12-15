import { Meteor } from 'meteor/meteor';
// import React, { PropTypes } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button, Message } from 'semantic-ui-react';
import { find } from 'lodash';

export default class UnstartedPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  render() {
    const { team, puzzle, disabled } = this.props;

    return (
      <Segment disabled={ disabled }>
        <Header as='h3' content={ puzzle.name }/>
        { this._startButton() }
        { this._error() }
      </Segment>
    );
  }

  _startButton() {
    const { disabled } = this.props;
    if (disabled) {
      return <Message content='Another Puzzle is being solved'/>;
    } else {
      return <Button
        color='green'
        fluid
        size='large'
        content='Start Timer'
        onClick={ () => this._startTimer() }
      />;
    }
  }

  _error() {
    if (!this.state.error) return null;
    return (
      <Message negative
        header='Error'
        content={ this.state.error.reason }
        onDismiss={ () => this.setState({ error: null }) }
      />
    );
  }

  _startTimer() {
    const { team, puzzle, volunteer } = this.props;
    if (puzzle.puzzleId !== volunteer.puzzleStation) {
      const target = find(team.puzzles, (p) => p.puzzleId === puzzle.puzzleId);
      const volunteerPuzzle = find(team.puzzles, (p) => p.puzzleId === volunteer.puzzleStation);
      const warningMsg = `
Error!
They asked for
"${target.name}"

But, your puzzle station is set to
"${volunteerPuzzle.name}"

You can only start a puzzle time that matches your current active puzzle station!
`
      return;
    }

    Meteor.call('volunteer.team.startPuzzle', team._id, puzzle.puzzleId, (error, result) => {
      if (error) return this.setState({ error });
    });
  }
}

UnstartedPuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  volunteer: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
