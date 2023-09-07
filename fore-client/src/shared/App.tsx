import React from 'react';
import Home from "../home/Home";
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme';
import { initializeApp } from 'firebase/app';
import { config } from '../config/config';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../modules/Dashboard';
import Equipment from '../modules/Equipment';
import Scores from '../modules/Scores';
import Courses from '../modules/Courses';
import Leaderboard from '../modules/Leaderboard';

initializeApp(config.fireBaseConfig);

const App = (): React.ReactElement => {
  return (
    <ChakraProvider theme={theme}>
        <Home />
    </ChakraProvider>
  );
}

export default App;
