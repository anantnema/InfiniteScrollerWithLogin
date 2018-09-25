import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';

import fakeAuth from '../Authentication/auth.js';

// This is Login Component where you take username and password from the users
// and do the client side authentication.

class Login extends Component {
  state = {
    redirectToReferrer: false
  }
  // loginOnEnter: After adding the username and password, if user press enter
  // it will check for the corresponding username and password and authenticate
  // the user.

  // It will call fakeAuth.authenticate, we are going to pass a callback function
  // and when this callback function is invoked we will call setState, and then we
  // will change redirectToReferrer to true.
  // if it username and password matches then it will set redirectToReferrer
  // to true so that it will know that user is authenticated and it will redirect
  // it to correct page i.e. infinitescroll page.
  // or else it will give you an alert saying wrong Credentials.
    loginOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.doAuth(this.state)
        }
    }
    // loginOnClick is similar to loginOnEnter, but it will be called/invoked only
    // when user clicks the submit button
    loginOnClick = (e) => {
        this.doAuth(this.state)
    }

    doAuth(state) {
        if (state.username === "anant" && state.password === "nema") {
            fakeAuth.authenticate(() => {
                this.setState(() => ({
                    redirectToReferrer: true
                }))
            })
        }
        else {
            alert('wrong Credentials');
        }
    }

    /* Taking that redirectToReferrer from above and check whether it is true or nothing
      and redirect it to desired page.  If it is false then it will redirect to login
      page and ask for username and password
      THis login component will send props*/
  render() {

    const { from } = this.props.location.state || { from: { pathname: '/infinitescroll' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true ) {
      return <Redirect to={from} />
    }

    return (
        <div className="App">
          <TextField
           hintText="Enter your Username"
           floatingLabelText="Username"
           onChange = {(event,newValue) => this.setState({username:newValue})}
           />

          <br/>

          <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             onKeyPress={(e) => this.loginOnEnter(e)}
           />

           <br/>

           <RaisedButton
             label="Submit"
             primary={true}
             style={style}
             onClick = {(e) => this.loginOnClick(e)}
           />
        </div>
    )
  }
}
const style = {
 margin: 15,
};

export default Login;
