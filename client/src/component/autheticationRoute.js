import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AUTH_TOKEN from '../constant';

function AuthenticationRoute({ component, path }) {

    if (localStorage.getItem(AUTH_TOKEN)) return <Route path={path} component={component}/>
    return <Redirect path='/'/>
}

export default AuthenticationRoute

