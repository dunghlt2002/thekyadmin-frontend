import React, { Component } from "react";
import userDataService from "../services/user.service";
// import { Link } from "react-router-dom";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';

class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.onChangeUser = this.onChangeUser.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      
      this.getUser = this.getUser.bind(this);
      this.updateIsAdmin_status = this.updateIsAdmin_status.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);

      this.state = {
          loading: null,
          error: null,
          userInfo: null,
          currentUser: {
            id: null,
            user: '',
            password: '',
            token: '',
            isadmin: 0
          },
          message: "",
          user: '',
          email: '',
          password: '',
          isadmin: 0
      };
  }

  componentDidMount() {

    console.log('hi profilet diMount');
    if (this.props.currUser === null) {
      this.props.history.push("/signin");
    }
    else {
      this.getUser(this.props.currUser.userInfo.id);
    }
    

  }

  onChangeUser(e) {
    const user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          user: user
        }
      };
    });
  }

  
  onChangeEmail(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const email = e.target.value;
    console.log('email moi ' +  email);
    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          email: email
        }
      };
    });
    console.log('new user ' + JSON.stringify(this.state.currentUser));
  }

  onChangePassword(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const password = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password
        }
      };
    });
  }


  getUser(id) {
    console.log('user id trg getUser: ' + id);
    userDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateIsAdmin_status(isadmin) {
    var data = {
      id: this.state.currentUser.id,
      user: this.state.currentUser.user,
      password: this.state.currentUser.password,
      isadmin: isadmin
    };

    userDataService.update(this.state.currentUser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            isadmin: isadmin
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //works great 6/26/2020
  updateUser() {
    
    //console.log('CAT id trong update: ' + this.state.currentUser.id);
    userDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        // Sequelize xong
        console.log(response.data);

        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
      window.location="/categories";
  }
  
  //works great 6/26/2020
  deleteUser() {  
    //console.log('vo delete func   :  ' + this.state.currentUser.id);  
    const users_id = this.state.currentUser.id;

    userDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/categories')
      })
      .catch(e => {
        console.log(e);
      });
  }

  logoutHandler = (e) => {
    e.preventDefault();
    // dispatch(userLoginFetch(this.state.user, this.state.password));
    // this.props.userLogoutFetch(this.state.user,this.state.password);
    this.props.userLogoutFetch();
    this.props.history.push("/");
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="profile-info">
      <div className="form">
        {/* <form onSubmit={this.submitHandler} > */}
        <form >
          <ul className="form-container">
          <li>
              <button type="button" onClick={this.logoutHandler} className="btn-block btn-danger">Logout</button>
            </li>
            <li>
              <h2>User Profile</h2>
            </li>
            <li>
              {/* {this.state.loading && <div>Loading...</div>}
              {this.state.error && <div>{this.state.error}</div>} */}
              {/* {success && <div>Profile Saved Successfully.</div>} */}
            </li>
            <li>
              <label htmlFor="name">
                Name
              </label>
              <input value={currentUser.user} type="user" name="user" id="user" onChange={(e) => this.onChangeUser(e)}>
              </input>
            </li>

            <li>
              <label htmlFor="email">
                Email
              </label>
              <input value={currentUser.email} type="email" name="email" id="email" onChange={(e) => this.onChangeEmail(e)}>
              </input>
            </li>

            <li>
              <label htmlFor="password">Password</label>
              <input value={currentUser.password} type="" id="password" name="password" onChange={(e) => this.onChangePassword(e)}>
              </input>
            </li>

            <li>
                <label>
                  <strong>Status: </strong>
                  {currentUser.isadmin ? "Regular" : "Admin"}
                </label>
                
            </li>
            <li>
                {/* nut status update nay de hoc hoi cho vui chu hong co khac biet gi ro rang voi cac field khac */}
                {currentUser.isadmin ? (
                  <button
                    className="btn badge-primary mr-2"
                    onClick={() => this.updateIsAdmin_status(false)}
                  >
                    Change to Admin Role
                  </button>
                ) : (
                  <button
                    className="btn btn-info mr-2"
                    //button badge-primary mr-2
                    onClick={() => this.updateIsAdmin_status(true)}
                  >
                    Change to Regular User
                  </button>
                )}
            </li>

            <li>
              <button type="button"  onClick={this.updateUser} className="btn-block btn-success">Update</button>
            </li>
            <li>
              <button type="button"  onClick={this.deleteUser} className="btn-block btn-danger">Delete</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLogoutFetch: () => dispatch(userLogoutFetch())
})
const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin));
  // console.log('ID  trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo.id));
  // console.log('token  trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo.token));
  
  return {
      currUser: state.userSignin
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

