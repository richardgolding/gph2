import React from 'react';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import RequireAuth from '../components/app/imports/RequireAuth.js';
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
		    <Route path='game' element={<RequireAuth accessLevel='user'><Game /></RequireAuth>} />
			{/* <Route index element={ Game }/> */}
		    {/* </Route> */}

		    {/* Team Routes */}
		    <Route path='team'>
				<Route index element={<RequireAuth accessLevel='user'><Team /></RequireAuth>}/>
				<Route path='create' element={<RequireAuth accessLevel='user'><TeamCreator /></RequireAuth>}/>
				<Route path='join' element={<RequireAuth accessLevel='user'><TeamBrowser /></RequireAuth>}/>
				<Route path='checkin' element={<RequireAuth accessLevel='user'><TeamCheckin /></RequireAuth>}/>
		    </Route>

		    <Route path='looking-for-team' element={<RequireAuth accessLevel='user'><LookingForTeam /></RequireAuth>} />

		    {/* Volunteer Routes */}
		    <Route path='volunteer'>
				<Route index element={<RequireAuth accessLevel='volunteer'><Volunteer /></RequireAuth> }/>
				<Route path='time/:teamId/:puzzleId' element={<RequireAuth accessLevel='volunteer'><VolunteerTimer /></RequireAuth>}/>
				<Route path='game-progress' element={<RequireAuth accessLevel='volunteer'><GameProgress /></RequireAuth>}/>
				<Route path='checkin/:teamId' element={<RequireAuth accessLevel='volunteer'><VolunteerTeamCheckIn /></RequireAuth>}/>
		    </Route>

		    {/* Admin Routes */}
		    <Route path='admin'>
				<Route index element={<RequireAuth accessLevel='admin'><AdminUsers /></RequireAuth>} />
				<Route path='users' element={<RequireAuth accessLevel='admin'><AdminUsers /></RequireAuth>} />
				<Route path='teams' element={<RequireAuth accessLevel='admin'><AdminTeams /></RequireAuth>} />
				<Route path='transactions' element={<RequireAuth accessLevel='admin'><AdminTransactions /></RequireAuth>} />
				<Route path='sponsors' element={<RequireAuth accessLevel='admin'><AdminSponsors /></RequireAuth>} />
				<Route path='puzzles' element={<RequireAuth accessLevel='admin'><AdminPuzzles /></RequireAuth>} />
				<Route path='gamestate' element={<RequireAuth accessLevel='admin'><AdminGamestate /></RequireAuth>} />
		    </Route>
			

		    <Route path='*' element={<Home />}/>
		</Route>

            </Routes>
	</BrowserRouter>
    );
}
