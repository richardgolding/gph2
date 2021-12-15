import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment,
  Header,
  Form,
  Button,
  Icon,
  List,
  Dropdown,
  Message,
} from 'semantic-ui-react';
import { pick } from 'lodash';

import GamestateComp from '../../imports/GamestateComp';

const { eventYear, eventDate, eventDay } = Meteor.settings.public;

const accountTypeOptions = [
  { key: 'student', value: 'STUDENT', text: 'Student (currently enrolled in any school)' },
  { key: 'nonstudent', value: 'NONSTUDENT', text: 'Non-Student (not currently enrolled)' },
  { key: 'volunteer', value: 'VOLUNTEER', text: 'Volunteer (does not play in game)' },
];

/* States now include Canadian provinces, but we'll leave the variable name the same */
const STATES = [
  { key: 'WA', text: 'WA', value: 'WA' },
  { key: 'AL', text: 'AL', value: 'AL' },
  { key: 'AK', text: 'AK', value: 'AK' },
  { key: 'AS', text: 'AS', value: 'AS' },
  { key: 'AZ', text: 'AZ', value: 'AZ' },
  { key: 'AR', text: 'AR', value: 'AR' },
  { key: 'CA', text: 'CA', value: 'CA' },
  { key: 'CO', text: 'CO', value: 'CO' },
  { key: 'CT', text: 'CT', value: 'CT' },
  { key: 'DE', text: 'DE', value: 'DE' },
  { key: 'DC', text: 'DC', value: 'DC' },
  { key: 'FM', text: 'FM', value: 'FM' },
  { key: 'FL', text: 'FL', value: 'FL' },
  { key: 'GA', text: 'GA', value: 'GA' },
  { key: 'GU', text: 'GU', value: 'GU' },
  { key: 'HI', text: 'HI', value: 'HI' },
  { key: 'ID', text: 'ID', value: 'ID' },
  { key: 'IL', text: 'IL', value: 'IL' },
  { key: 'IN', text: 'IN', value: 'IN' },
  { key: 'IA', text: 'IA', value: 'IA' },
  { key: 'KS', text: 'KS', value: 'KS' },
  { key: 'KY', text: 'KY', value: 'KY' },
  { key: 'LA', text: 'LA', value: 'LA' },
  { key: 'ME', text: 'ME', value: 'ME' },
  { key: 'MH', text: 'MH', value: 'MH' },
  { key: 'MD', text: 'MD', value: 'MD' },
  { key: 'MA', text: 'MA', value: 'MA' },
  { key: 'MI', text: 'MI', value: 'MI' },
  { key: 'MN', text: 'MN', value: 'MN' },
  { key: 'MS', text: 'MS', value: 'MS' },
  { key: 'MO', text: 'MO', value: 'MO' },
  { key: 'MT', text: 'MT', value: 'MT' },
  { key: 'NE', text: 'NE', value: 'NE' },
  { key: 'NV', text: 'NV', value: 'NV' },
  { key: 'NH', text: 'NH', value: 'NH' },
  { key: 'NJ', text: 'NJ', value: 'NJ' },
  { key: 'NM', text: 'NM', value: 'NM' },
  { key: 'NY', text: 'NY', value: 'NY' },
  { key: 'NC', text: 'NC', value: 'NC' },
  { key: 'ND', text: 'ND', value: 'ND' },
  { key: 'MP', text: 'MP', value: 'MP' },
  { key: 'OH', text: 'OH', value: 'OH' },
  { key: 'OK', text: 'OK', value: 'OK' },
  { key: 'OR', text: 'OR', value: 'OR' },
  { key: 'PW', text: 'PW', value: 'PW' },
  { key: 'PA', text: 'PA', value: 'PA' },
  { key: 'PR', text: 'PR', value: 'PR' },
  { key: 'RI', text: 'RI', value: 'RI' },
  { key: 'SC', text: 'SC', value: 'SC' },
  { key: 'SD', text: 'SD', value: 'SD' },
  { key: 'TN', text: 'TN', value: 'TN' },
  { key: 'TX', text: 'TX', value: 'TX' },
  { key: 'UT', text: 'UT', value: 'UT' },
  { key: 'VT', text: 'VT', value: 'VT' },
  { key: 'VI', text: 'VI', value: 'VI' },
  { key: 'VA', text: 'VA', value: 'VA' },
  { key: 'WV', text: 'WV', value: 'WV' },
  { key: 'WI', text: 'WI', value: 'WI' },
  { key: 'WY', text: 'WY', value: 'WY' },

  /* Canadian Provinces */
  { key: 'NL', text: 'NL', value: 'NL' },
  { key: 'PE', text: 'PE', value: 'PE' },
  { key: 'NS', text: 'NS', value: 'NS' },
  { key: 'NB', text: 'NB', value: 'NB' },
  { key: 'QB', text: 'QB', value: 'QB' },
  { key: 'ON', text: 'ON', value: 'ON' },
  { key: 'MB', text: 'MB', value: 'MB' },
  { key: 'SK', text: 'SK', value: 'SK' },
  { key: 'AB', text: 'AB', value: 'AB' },
  { key: 'BC', text: 'BC', value: 'BC' },
  { key: 'YT', text: 'YT', value: 'YT' },
  { key: 'NT', text: 'NT', value: 'NT' },
  { key: 'NU', text: 'NU', value: 'NU' },
];

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'register',
      email: '',
      firstname: '',
      lastname: '',
      accountType: '',
      password: '',
      confirmPassword: '',
      coords: '',
      phone: '',
      age: '',
      address: '',
      city: '',
      zip: '',
      state: '',
      country: '',
      ecName: '',
      ecRelationship: '',
      ecPhone: '',
      ecEmail: '',
      parentGuardian: '',
      photoPermission: true,
      holdHarmless: false,
      showHoldHarmless: false,
    };
  }

  render() {
    if (!this.props.ready) {
      return <Loading/>
    } else if (this.props.gamestate.registration) {
      return this._renderMain();
    } else {
      return <Message
        info
        header='Registration is closed'
        content="Next year's Great Puzzle Hunt is in development" />
    }
  }

  _renderMain() {
    switch (this.state.mode) {
      case 'loading':
        return <Loading />;
      case 'thankyou':
        return this._thankyou();
      default:
        return this._form();
    }
  }

  _thankyou() {
    return (
      <Segment basic>
        <Message icon>
          <Icon name='mail' color='green'/>
          <Message.Content>
            <Header as='h3'>Thank you for creating an account!<br/></Header>
            <p>We have sent a verification email to <strong>{ this.state.email }</strong>. Go check your email!</p>
            <p><strong>You must click the verification link in that email</strong> in order to complete the registration process.</p>
          </Message.Content>
        </Message>

      </Segment>
    );
  }

  _form() {
    return (
      <Form onSubmit={ (e) => this._register(e) } style={ this._formStyle() }>
        <Header as='h1' icon={<Icon name='user' color='green'/>} content={`Create account for the ${eventYear} Great Puzzle Hunt`} subheader={`${eventDate} at Western Washington University, Bellingham, WA`}/>
        <Message color='orange' size='huge'>
          <Message.Content>
            <Segment basic size='large' className='no-padding'>Game day is soon! Make sure at least one team member can obtain the <a target="_blank" href="https://gph-distributed.s3-us-west-2.amazonaws.com/GPH2021-what-you-need.pdf">necessary materials</a>.</Segment>
          </Message.Content>
        </Message>

        {this._errorMessage()}

        <Form.Group widths='equal'>
          <Form.Input name='firstname' label='First Name' placeholder='First Name'
                      value={this.state.firstname} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='lastname' label='Last Name' placeholder='Last Name'
                      value={this.state.lastname} onChange={(e) => this._handleTextChange(e)} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='email' type='email' label='Email' placeholder='your@email.com'
                      value={ this.state.email } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Dropdown name='accountType' label='Account Type' placeholder='Account Type'
                      selection options={accountTypeOptions} value={ this.state.accountType }
                      onChange={ (e, data) => this._handleDataChange(e, data) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='password' type='password' label='Password' placeholder='password'
                      value={ this.state.password } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='confirmPassword' type='password' label='Confirm Password'
                      placeholder='password again' value={ this.state.confirmPassword }
                      onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Header as='h3' icon={<Icon name='home' color='blue'/>} content='Player Details'
                subheader='This information is required in the case of emergency.'/>

        <Form.Group widths='equal'>
          <Form.Input name='phone' type='tel' label='Phone' placeholder='555-555-1234'
                      value={ this.state.phone } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='age' type='text' label='Age' placeholder='Number of revolutions around sun'
                      value={ this.state.age } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='address' type='text' label='Mailing Address' placeholder='123 Main St'
                      value={ this.state.address } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='city' type='text' label='City' placeholder='e.g. Bellingham'
                      value={ this.state.city } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='zip' label='Zip Code' placeholder='e.g. 98225' value={ this.state.zip }
                      onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Dropdown name='state' label='State/Province' search selection options={ STATES }
                      value={ this.state.state } onChange={ (e,data) => this._handleDataChange(e,data) }/>
          <Form.Input name='country' label='Country' placeholder='e.g. U.S.A.' value={ this.state.country }
                      onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Header as='h3' icon={<Icon name='ambulance' color='red'/>}
                content='Emergency Contact'
                subheader='This information is required in the case of emergency.'/>

        <Form.Group widths='equal'>
          <Form.Input name='ecName' label='Full Name' placeholder='Emergency Contact'
                      value={ this.state.ecName } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='ecRelationship' label='Relationship'
                      placeholder='How you know this person' value={ this.state.ecRelationship }
                      onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='ecPhone' label='Phone' placeholder='A phone they will answer'
                      value={ this.state.ecPhone } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='ecEmail' label='Email' placeholder='A reliable email'
                      value={ this.state.ecEmail } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        { this._parentGuardian()}

        <List>
          <List.Item><strong>Participants under age 18:</strong> A parent/legal guardian
            must complete this registration form on behalf of their minor.</List.Item>
          <List.Item><strong>Participants under age 14:</strong> In addition to registering
            their child, a <u>parent/legal guardian must also register</u> and <u>join the
              same team</u> as their under age 14 child and <u>accompany them at
                all times</u> during the Puzzle Hunt.</List.Item>
        </List>

        <Header as='h3' icon={<Icon name='camera' color='violet'/>} content='Photo Permission'/>

        <Form.Checkbox
          toggle
          defaultChecked={this.state.photoPermission}
          name='photoPermission'
          label="Participants are welcome to send photos of their teams in action to millie@greatpuzzlehunt.com. I hereby give my permission to Western and the Great Puzzle Hunt to use my (or my minor child’s) submitted image, in photo or video, in whole or in part, for public information and marketing of the WWU Great Puzzle Hunt at its discretion."
          onChange={ (e,data) => this._handleDataChange(e,data) } />

        <Header as='h3' icon={<Icon name='pencil' color='orange'/>}
                content='Acknowledgement of Risk & Hold Harmless Agreement' />

        { this._holdHarmlessButton() }

        { this._holdHarmless() }

        <Form.Checkbox
          toggle
          defaultChecked={this.state.holdHarmless}
          name='holdHarmless'
          label='By checking this box I acknowledge that I have read and understand the Risk & Hold Harmless Agreement and that I agree (or give permission for my minor child) to receive direct communication from Western’s 2021 Great Puzzle Hunt staff.'
          onChange={ (e,data) => this._handleDataChange(e,data) }/>

        <Form.Button fluid type='submit' content='Submit' color='green'/>

        { this._errorMessage() }
      </Form>
    );
  }

  _formStyle() {
    return {
      maxWidth: '640px',
      marginRight: 'auto',
      marginLeft: 'auto',
    };
  }

  _register(e) {
    e.preventDefault();
    const data = this._registrationData();

    this.setState({ mode: 'loading' });

    Meteor.call('user.register', data, (error, result) => {
      if (error) return this.setState({ error, mode: 'register' });
      this.setState({ error: null, result, mode: 'thankyou' });
    });
  }

  _registrationData() {
    const fields = [
      'firstname', 'lastname', 'email', 'accountType', 'password', 'confirmPassword', 'coords',
      'phone', 'age', 'address', 'city', 'zip', 'state', 'country',
      'ecName', 'ecRelationship', 'ecPhone', 'ecEmail', 'parentGuardian',
      'photoPermission', 'holdHarmless'
    ];

    return pick(this.state, fields);
  }

  _handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleDataChange(e, data) {
    const { name, value, checked } = data;
    // console.log(data);
    this.setState({ [name]: (value || checked) });
  }

  _handleCheckBoxChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
  }

  _holdHarmlessButton() {
    if (this.state.showHoldHarmless) {
      return <Button as='a' basic content='Hide Agreement' onClick={ (e) => this.setState({ showHoldHarmless: false }) }/>
    }
    else {
      return <Button as='a' basic content='Show Agreement' onClick={ (e) => this.setState({ showHoldHarmless: true }) }/>
    }
  }

  _holdHarmless() {
    if (!this.state.showHoldHarmless) return <p></p>;
    return (
      <Segment basic>
        <p>I hereby acknowledge that I have voluntarily chosen (or voluntarily chosen to allow my minor child) to participate in the {eventYear} WWU Great Puzzle Hunt sponsored by the WWU Mathematics Department, held on {eventDay}, {eventDate}. I understand the risks involved in the Puzzle Hunt, including the unlikely but potential risk of injury to me (or my minor child), and I agree to accept any and all risks associated with my participation.</p>
        <p><strong>Introduction:</strong> Western Washington University (Western) is offering the {eventYear} Great Puzzle Hunt as a virtual event. All participation is done online and communications involving issues such as registration questions, troubleshooting, event updates, or awards will be done via text, email, phone, social media, and the website <a href="https://greatpuzzlehunt.com">https://greatpuzzlehunt.com</a>. Participants will be asked to use a smartphone or computer, scissors, writing utensils (colored pencils, pen, pencil, highlighters, felt tips), tape, eraser, paper, straightedge, hole punch, and a printer to print out puzzles.</p>
        <p><strong>Responsibility for Participants:</strong> Participants are voluntarily participating in the {eventYear} Great Puzzle Hunt with the knowledge of the risks involved and hereby agree to accept any and all inherent risks of the activity. Parents/legal guardians are ultimately responsible for the supervision, health, safety and well-being of their minor children who are participating in the {eventYear} Great Puzzle Hunt.</p>
        <p><strong>Liability:</strong> Western is not responsible or liable for any injury to a participant, including a minor child, unless caused by the negligence or willful misconduct of Western Washington University, its officers, agents, volunteers, or employees.</p>
        <p><strong>Communication:</strong> All direct communication between {eventYear} Great Puzzle Hunt staff and participants, including minor children, shall be for purposes of the virtual event. The agreement below authorizes {eventYear} Great Puzzle Hunt staff to communicate directly with a participant via phone, text, and email.</p>
        <p><strong>Participants under age 18:</strong> A parent/legal guardian must complete this registration form on behalf of their minor.</p>
      </Segment>
    );
  }

  _parentGuardian() {
    const age = parseInt(this.state.age);
    if ((age < 14) || (age === NaN)) {
      return (
        <Form.Input
          name='parentGuardian'
          type='text'
          label="Parent/Guardian accompanying player if under the age of 14"
          placeholder='Full name of legal parent/guardian'
          value={ this.state.parentGuardian }
          onChange={ (e) => this._handleTextChange(e) }/>
      );
    } else {
      return null;
    }
  }

  _errorMessage() {
    if (!this.state.error) return null;
    return <Message negative
      icon='warning'
      title='There were issues registering!'
      content={ this.state.error.reason }
      onDismiss={ (e) => this.setState({ error: null }) } />
  }
}

export default GamestateComp(RegisterForm);
