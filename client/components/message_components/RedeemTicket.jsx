import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Segment, Header, Message, Form, Icon, Button } from 'semantic-ui-react';

const { eventYear} = Meteor.settings.public;

RedeemTicket = class RedeemTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketCode: '',
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Container><Loading/></Container>
      );
    } else {
      return this._redeemForm();
    }
  }

  _redeemForm() {
    let link = `https://commerce.cashnet.com/TheGreatPuzzleHunt${eventYear}`;
    return (
      <Container>
        <PuzzlePageTitle title="Purchase and Redeem Ticket Codes"/>
        <Segment raised>
          <Header as='h3'>Step 2: Purchase ticket code</Header>
          <Button
            as='a'
            target="_blank"
            href={link}
            icon fluid size='large'
            labelPosition='right'
            color='blue'>
            Purchase ticket codes and gear here! <Icon name='shop'/>
          </Button>
          <Header as='h3'>Step 3: Redeem ticket code</Header>
          <p>You will receive your ticket codes in an email.</p>
          <Form size="large" onSubmit={(e) => this._redeem(e)}>
            <Form.Input
            icon="ticket"
            iconPosition="left"
            type="text"
            name="ticketCode"
            placeholder="Paste Your Ticket Code Here"
            autoComplete="off"
            value={ this.state.ticketCode }
            onChange={ (e) => this._handleTextChange(e) }
            />
            <Form.Button fluid size="large" color='green' type="submit" content="Redeem" />
          </Form>
          { this._errorMessage() }
        </Segment>

      </Container>
    );
  }

  _redeem(e) {
    e.preventDefault();
    const { ticketCode } = this.state;
    if (ticketCode.length === 0) {
      return this.setState({ error: { reason: "You must paste a ticket code!" } });
    }

    // this.setState({ loading: true });
    Meteor.call('user.redeem', ticketCode, (error, result) => {
      if (error) return this.setState({ error, loading: false });
      this.setState({ error: null });
    });
  }

  _handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _errorMessage() {
    if (!this.state.error) return null;
    return <Message negative
      icon='warning'
      title='There were issues redeeming this ticket code!'
      content={ this.state.error.reason }
      onDismiss={ (e) => this.setState({ error: null }) } />
  }
}
