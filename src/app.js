import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore';
import { startSetTodos } from './actions/todos'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import './styles/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

const jsx = (
   <Provider store={store}>
   <AppRouter />
   </Provider> 
)
export let userInfo = ''
export let userPhoto = ''

let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userPhoto = user.photoURL
        userInfo = (
            <div>
                <p>{user.displayName}</p>
                <span>{user.email}</span>
            </div>
        )
        store.dispatch(login(user.uid,user.displayName, user.email, user.photoURL))
        store.dispatch(startSetTodos()).then(() => {
            renderApp()
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        })

    } else {
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})