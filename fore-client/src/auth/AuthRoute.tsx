import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Unauthorized from "../components/common/Unauthorized";
import useAuth from "./useAuth";

const AuthRoute = (props: { children: any; }): React.ReactElement => {
    const { children } = props;
    const { auth, loggedIn } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(loggedIn);

    onAuthStateChanged(auth, (user) => {
        if (user != null) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    });
    
    if (!isAuthorized) return <Unauthorized />;
    
    return <>{children}</>;
};

export default AuthRoute;