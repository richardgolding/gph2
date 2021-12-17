import React from 'react';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import makeAuthed from '../components/app/imports/make-authed.js';
import App from '../components/app/App';

export const renderRoutes = () => {
    console.log('in renderRoutes');
    return (
	<BrowserRouter>
	    <Routes>

		<Route path='/' element={<App />}>

		    {/* Home/Public Routes */}
		    <Route index element={<Home />}/>
		    <Route path='teams-list' element={<PublicTeamList />}/>
		    <Route path='Media' element={<Media />}/>
		    <Route path='Gear' element={<Gear />} />
		    <Route path='contact' element={<Contact />}/>
		    <Route path='puzzles' element={<SamplePuzzles />}/>
		    <Route path='faq' element={<FAQ />}/>
		    <Route path='qrcode' element={<QRCode />}/>
		    <Route path='register' element={<Register />}/>
		    <Route path='rules' element={ <RulesOfPlay /> }/>
		    <Route path='leaderboard' element={<AdminLeaderboard />} />

		    {/* Authentication Routes */}
		    <Route path='login' element={<Login />}/>
		    <Route path='requestpasswordreset' element={RequestPasswordReset}/>
		    <Route path='passwordreset/:token' element={PasswordReset}/>
		    <Route path='redeem' element={RedeemTicket}/>

		    {/* User Routes */}
		    <Route path='profile' element={Profile}/>

		    {/* Game Routes */}
		    <Route path='game' element={makeAuthed('user')}>
			<Route index element={ Game }/>
		    </Route>

		    {/* Team Routes */}
		    <Route path='team' element={makeAuthed('user')}>
			<Route index element={Team}/>
			<Route path='create' element={TeamCreator}/>
			<Route path='join' element={TeamBrowser}/>
			<Route path='checkin' element={TeamCheckin}/>
		    </Route>

		    <Route path='looking-for-team' element={makeAuthed('user')}>
			<Route index element={ LookingForTeam }/>
		    </Route>

		    {/* Volunteer Routes */}
		    <Route path='volunteer' element={makeAuthed('volunteer')}>
			<Route index element={ Volunteer }/>
			<Route path='time/:teamId/:puzzleId' element={VolunteerTimer}/>
			<Route path='game-progress' element={GameProgress}/>

			<Route path='checkin/:teamId' element={VolunteerTeamCheckIn}/>
		    </Route>

		    {/* Admin Routes */}
		    <Route path='admin' element={makeAuthed('admin')}>
			<Route index element={AdminUsers} />
			<Route path='users' element={AdminUsers} />
			<Route path='teams' element={AdminTeams} />
			<Route path='transactions' element={AdminTransactions} />
			<Route path='sponsors' element={AdminSponsors} />
			<Route path='puzzles' element={AdminPuzzles} />
			<Route path='gamestate' element={AdminGamestate} />
		    </Route>

		    <Route path='*' element={<Home />}/>
		</Route>

            </Routes>
	</BrowserRouter>
    );
}
