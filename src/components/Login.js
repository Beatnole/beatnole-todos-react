import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogin } from '../actions/auth'

export const Login = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Todo Login</h1>
            <button onClick={startLogin} className="button button_adjust button-group">Login with Google</button>
            <Link className="button button_adjust button-group" to="/email">Login with Email</Link>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(Login)