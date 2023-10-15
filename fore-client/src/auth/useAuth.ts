import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

// TODO: look into http intercepters to add auth token to requests
// req.headers.set('Authorization', `Bearer ${token}`) after
// getting token from firebase auth
// add request and response interceptors if possible

const useAuth = () => {
    const auth = getAuth();
    const [ authorizing, setAuthorizing ] = useState<boolean>(false);
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setAuthorizing(true);
        signInWithPopup(auth, provider).catch(error => console.log(error));
        setAuthorizing(false);
    };

    const handleAuthAction = () => {
        if (authorizing) return;
        if (auth.currentUser != null) {
            signOut(auth).catch(error => console.log(error));
        } else {
            try {
                signInWithGoogle();
            } catch(error) {
                console.log(error);
            }
        }
    }

    return {
        auth,
        loggedIn: auth.currentUser !== null,
        handleAuthAction,
    }
}

export default useAuth;