import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './InfiniteScroll.css';


class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      isLoading: false,
      users: [],
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadUsers,
        state: {
          error,
          isLoading
        },
      } = this;


      if (error || isLoading  ) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadUsers();
      }
    };
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      axios.get('https://randomuser.me/api/?results=10')
        .then((response) => {
          // Creates a massaged array of user data
          console.log(response);
          const nextUsers = response.data.results.map(user => ({
            email: user.email,
            name: Object.values(user.name).join(' '),
            photo: user.picture.medium,
            username: user.login.username,
            uuid: user.login.uuid,
          }));

          // Merges the next users into our existing users
          this.setState({
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      isLoading,
      users
    } = this.state;

    return (
      <div className="InfiniteScroll">
        <h1>Infinite Users!</h1>
        <Typography>Scroll down to load more!!</Typography>
        {users.map(user => (
          <Fragment key={user.username}>
            <hr />
            <div style={{ display: 'flex' }}>
              <img
                alt={user.username}
                src={user.photo}
                style={{
                  borderRadius: '50%',
                  height: 72,
                  marginRight: 20,
                  width: 72,
                }}
              />
              <div>
                <h2 style={{ marginTop: 0 }}>
                  @{user.username}
                </h2>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
              </div>
            </div>
          </Fragment>
        ))}
        <hr />
        {/*shows error message if there is any*/}
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {/*show loading... if u scroll down till u get the data form api*/}
        {isLoading &&
          <div>Loading...</div>
        }

      </div>
    );
  }
}

export default InfiniteScroll;
