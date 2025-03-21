import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import store from './store'

import io from 'socket.io-client';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// SET to true if running flask on localhost. set to false if using localhost.run to port tunnel
const localhost = true;
const backendUrl = localhost ? 'http://localhost:5000' : 'http://arctic.lhr.rocks';
const apiUrl = backendUrl + '/api';
// const GCLOUD_URL = 'http://34.95.57.130:5000';
const GCLOUD_URL = 'http://34.118.140.53:5000';

const socket = io(backendUrl);

store.dispatch({ type: 'set', backendUrl });
store.dispatch({ type: 'set', apiUrl });
store.dispatch({ type: 'set', GCLOUD_URL });
store.dispatch({ type: 'set', socket });

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
