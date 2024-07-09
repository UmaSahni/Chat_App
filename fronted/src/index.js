import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';
import AuthContextProvider from './Context/AuthContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
 <ChatProvider>
  <ChakraProvider>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </ChakraProvider>
  </ChatProvider>
  </BrowserRouter>
  
);


