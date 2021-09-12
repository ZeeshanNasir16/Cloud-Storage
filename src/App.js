import React from 'react';
import ThemeConfig from './Components/theme';
import { AuthProvider } from './Context/AuthContext';
import { Routes } from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-awesome-lightbox/build/style.css';

const App = () => {
   return (
      <ThemeConfig>
         <AuthProvider>
            <Routes />
            <ToastContainer position='top-left' />
         </AuthProvider>
      </ThemeConfig>
   );
};

export default App;
