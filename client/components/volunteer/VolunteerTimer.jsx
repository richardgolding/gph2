import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Segment, Message, Button } from 'semantic-ui-react';

import VolunteerPuzzle from './imports/VolunteerPuzzle';

class VolunteerTimerInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { team } = this.props
    return (
      <Container>
        <PuzzlePageTitle title='Volunteer Timer' subTitle={team ? team.name : null}/>
          { this._timerUI() }
          <br/>
          <Button basic size='large' fluid color='violet' content='Close This Page' onClick={(e) => window.close() }/>
      </Container>
    );
  }

  _timerUI() {
    const { ready, volunteer, team, puzzleId } = this.props;
    if (!ready) {
      return <Loading />
    } else if (!team) {
      return <Message
        negative
        header='Oops!'
        content={ `No team with id ${prams.teamId}` }
      />;
    } else {
      const puzzle = team.puzzles.find((p) => p.puzzleId === puzzleId);
      return <VolunteerPuzzle volunteer={volunteer} team={team} puzzle={puzzle}/>;
    }
  }
}

VolunteerTimerInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  volunteer: PropTypes.object,
  team: PropTypes.object,
  puzzleId: PropTypes.string,
};

// In this container "params" is coming from the props added via react-router.
VolunteerTimer = withTracker(({ params }) => {
  const { teamId, puzzleId } = params;
  const handle = Meteor.subscribe('volunteer.team', teamId);
  const volunteer = Meteor.user();
  const ready = handle.ready() && Boolean(volunteer);
  const team = Teams.findOne(teamId);
  return {
    ready,
    volunteer,
    team,
    puzzleId,
  };
})(VolunteerTimerInner);
