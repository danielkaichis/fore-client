import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Unauthorized from "../components/common/Unauthorized";


const AuthRoute = (props: { children: any; }): React.ReactElement => {
    const { children } = props;
    const auth  = getAuth();
    const [isAuthorized, setIsAuthorized] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    });
    
    if (!isAuthorized) return <Unauthorized />;
    
    return <>{children}</>;
};

export default AuthRoute;