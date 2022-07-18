import React from "react";
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn, children, ...props }) {
    return (
        <Route {...props}>
            {isLoggedIn ? children : <Redirect to='./sign-up'/>}
        </Route>
    )
}

export default ProtectedRoute;