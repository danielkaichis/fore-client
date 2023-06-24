import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthRoute = (props: { children: any; }): React.ReactElement => {
    const { children } = props;
    const auth  = getAuth();
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    useEffect(() => {
        AuthCheck();
        return () => AuthCheck();
    }, [auth]);

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    });
    
    if (!isAuthorized) return <p>You are not logged in.</p>;
    
    return <>{children}</>;
};

export default AuthRoute;