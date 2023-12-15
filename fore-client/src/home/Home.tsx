import React from 'react';
import { Flex } from '@chakra-ui/react';
import AuthRoute from '../auth/AuthRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Dashboard,
  Equipment,
  Scores,
  Courses,
  Leaderboard,
  Sidebar,
} from './index';
import Canvas from './Canvas';

const Home = (): React.ReactElement => {
	return (
        <Flex px={2.5}
			  py="2.5vh"
			  className="home"
		>
			<BrowserRouter>
				<Sidebar />
				<AuthRoute>
					<Canvas>
						<Routes>
							<Route path="/" element={<Dashboard />}/>
							<Route path="/equipment" element={<Equipment />} />
							<Route path="/scores" element={<Scores />} />
							<Route path="/courses" element={<Courses />} />
							<Route path="/leaderboard" element={<Leaderboard />} />
						</Routes>
					</Canvas>
				</AuthRoute>
			</BrowserRouter>
        </Flex>
  );
};

export default Home
