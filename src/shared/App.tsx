import React from 'react';
import Home from "../home/Home";
import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react';
import theme from '../theme';

import { initializeApp } from 'firebase/app';
import { config } from '../config/config';
initializeApp(config.fireBaseConfig);

const App = (): React.ReactElement => {
  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top' }}}>
        <Home />
        <Analytics />
    </ChakraProvider>
  );
}

export default App;
