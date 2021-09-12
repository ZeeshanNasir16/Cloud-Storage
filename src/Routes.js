import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

import { Register } from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import { Login } from './Pages/Login';
import { Forgotpassword } from './Pages/Forgotpassword';

export function Routes() {
   const { currentUser } = useAuth();
   return (
      <React.Fragment>
         {currentUser ? (
            <Switch>
               <Route exact path='/' component={Dashboard} />
               <Route
                  exact
                  path='/folder/:folderId'
                  component={Dashboard}
               />
               <Redirect to='/' />
            </Switch>
         ) : (
            <Switch>
               <Route exact path='/login' component={Login} />
               <Route exact path='/register' component={Register} />
               <Route
                  exact
                  path='/forgotpassword'
                  component={Forgotpassword}
               />
               <Redirect to='/login' />
            </Switch>
         )}
      </React.Fragment>
   );
}
