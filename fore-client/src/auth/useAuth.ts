import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const useAuth = () => {
    const auth = getAuth();
    const [ authorizing, setAuthorizing ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(!!auth.currentUser);
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setAuthorizing(true);
        signInWithPopup(auth, provider).catch(error => console.log(error));
        setAuthorizing(false);
    };

    const handleAuthAction = () => {
        if (authorizing) return;
        if (loggedIn) {
            signOut(auth).then(() => {
                setLoggedIn(false);
            }, error => {
                console.log(error);
            });
        } else {
            try {
                signInWithGoogle();
                setLoggedIn(true);
            } catch(error) {
                console.log(error);
            }
        }
    }

    return {
        auth: auth,
        loggedIn: loggedIn,
        handleAuthAction: handleAuthAction,
    }
}

export default useAuth;