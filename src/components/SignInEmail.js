import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firebase } from '../firebase/firebase'
import { Link } from 'react-router-dom'

const SignInPage = ({ history }) =>
  <div className="box-layout">
    <div className="box-layout__box">
            <h1>Todo Sign In</h1>
            <SignInForm history={history} />
            <Link className="button button-password-reset" to="/forgotEmail">Forgot Password</Link>
        </div>
  </div>

  const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push('/dashboard')
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div>
          <form onSubmit={this.onSubmit} >
            <input
              autoFocus
              className="text-input__email"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
            <input
              className="text-input__email"
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Password"
            />
            <button disabled={isInvalid}
            type="submit" 
            className={isInvalid ? "button button--secondary" : "button"} >
              Sign In
            </button>

            { error && <p>{error.message}</p> }
          </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};