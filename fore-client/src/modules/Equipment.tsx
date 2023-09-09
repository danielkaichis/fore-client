import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";

const Equipment = (): React.ReactElement => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            user.getIdToken().then((token) => {
                // authenticate on server and get user equipment data
            });
        }
    });
    
    return (
        <div>Equipment</div>
    );
};

export default Equipment;