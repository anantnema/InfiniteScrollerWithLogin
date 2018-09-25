import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import fakeAuth from './auth.js';

// Purpose: When we are on infinitescroll page, you will see that signout button
// along with welcome text and if you are not logged in you will see
// you are not logged in

// Up until this point, when we've talked about redirecting, we've used React
// Router's Redirect component, but in this case, it doesn't really make a whole
// lot of sense.  We could change this into a class, we could have some state to
// it and then redirect that way, kind of like we did earlier where we flipped
// (redirectToReferrer).  But that just seems like a lot of work for this simple
// component.  So another thing that react router gives us is a history object,
// which has a push property on it, which will basically redirect us or
// it will take us to another route.

// THe problem with that is this AuthButton isn't being rendered by React Router,
// so we're not being passed a history prop.  So what we can do in order to receive
// that history prop is we can use React router's higher order component called
// withRouter

// In signout, as a callback, we can say once that's finished go ahead and call history.push
// so what's happening here is, because we need access to history in order to call history.push
// we use withRouter to wrap our component. THat gives us history, and that makes it so
// when we log out, we can call history.push, which will take us back to desired page
//
const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <MuiThemeProvider>
      <div>
        <p>
          Welcome! <RaisedButton onClick={() => {
            fakeAuth.signout(() => history.push('/'))
          }}>Sign out</RaisedButton>
        </p>
      </div>

    </MuiThemeProvider>
    ) : (
      <MuiThemeProvider>
        <div className="App">
           <Typography paragraph={true}>
                    You are not logged in.
           </Typography>
         </div>
    </MuiThemeProvider>
  )
))


export default AuthButton;
