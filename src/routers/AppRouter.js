import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import Login from '../components/Login'
import SignInForm from '../components/SignInEmail.js'
import PasswordForgetPage from '../components/ForgotPassword.js'
import TodoDashboardPage from '../components/TodoDashboardPage.js';
import EditTodoPage from '../components/EditTodoPage.js';
import NotFoundPage from '../components/NotFoundPage.js';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
            <PublicRoute path="/" component={Login} exact={true}/>
            <PublicRoute path="/email" component={SignInForm}/>
            <PublicRoute path="/forgotEmail" component={PasswordForgetPage}/>
            <PrivateRoute path="/dashboard" component={TodoDashboardPage} />
            <PrivateRoute path="/edit/:id" component={EditTodoPage} />
            <Route component={NotFoundPage}  />
        </Switch>
    </div>
    </Router>
)

export default AppRouter
