import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

export const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated, loading} = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated || loading ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        ></Route>
    );
};
