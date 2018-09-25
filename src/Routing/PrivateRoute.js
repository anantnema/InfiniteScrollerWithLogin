import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import fakeAuth from '../Authentication/auth';

// Purpose: function to implement private route i.e. user will only be able to access
// infinitescroll page if he/she is authenticated.

// As we have taken Component as an input in JSX(inside render).  So passed
// component as a parameter and have renamed it as Component.  And ...rest
// will pass the rest of the props. Then I have spread all of those rest props
// onto our component and then used react router render prop to say whenever the
// path matches with whatever the path was passed to the private route, go ahead
// & render this function.  IF the user is not authenticated then redirect will
// come into picture and redirect it to /login

// If you are not logged in and you still press that infinite scroll button,
// you will be redirected to login page and once you give the correct Credentials
// you will be redirected to infinitescroll page

// so when we redirect to login page, we actually want to pass along the current
// page the user is trying to go to, so that once we logged in, we can redirect
// back to that page.

// So instead of passing this "to" prop a string, we can pass it an object with
// the pathname set to login and we will also going to pass along some state.
// We'll say user is coming from props.location because props.location is the route
// that the user is trying to when this private route is rendered.
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

export default PrivateRoute;
