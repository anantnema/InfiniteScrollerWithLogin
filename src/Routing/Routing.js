import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Login from '../Login/Login';
import AuthButton from '../Authentication/AuthButton';
import PrivateRoute from './PrivateRoute';

const Routing = () => {
  return(
    <div>
      <Router>
          <div className="App" style={{ paddingTop: '70px' }}>
            <AuthButton />
            {/* I have rendered few normal routes, then we rendered this PrivateRoute passing it a path and component,
               just as we normally would.  Then we spread all of the arguments that were passed to the component
               into that route.  We have this render method, so this is going to be invoked when the path matches
               and then if we're authenticated, we render the comonent just as we normally would*/}
            {/* It will take us to desired pages.*/}
            <Typography><Link to="/login">Home Page</Link></Typography><br />
            <Typography><Link to="/InfiniteScroll">Infinite Scroll Page</Link></Typography>

            {/* It will use the corresponding components for respective pages.*/}
            <Route path="/login" component={Login}/>
            {/* This is the private Route. So that user will only be able to
              access this page when he/she is authenticated*/}
            <PrivateRoute path='/InfiniteScroll' component={InfiniteScroll} />
        </div>
      </Router>
    </div>
  )
}

export default Routing;
