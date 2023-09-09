import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Tooltip, Center, IconButton, useBoolean, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";


type LoginProps = {
    icon: IconType,
    loggedIn: boolean
}

const LoginButton = ({
    icon,
}: LoginProps): React.ReactElement => {
    const auth = getAuth();
    const [ authorizing, setAuthorizing ] = useState(false);
    const [ hovered, setHovered ] = useBoolean(false);
    const [ loggedIn, setLoggedIn ] = useState(auth.currentUser != null ? true : false);
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

    useEffect(() => {
        if (auth.currentUser) {
            setLoggedIn(true);
        }
    }, [auth.currentUser]);

    return(
        <Tooltip hasArrow label={loggedIn ? "Sign Out" : "Login"} bg='black' color='white' placement="right" borderRadius={4}>
            <Center
                onMouseEnter={setHovered.on} 
                onMouseLeave={setHovered.off}
                alignItems="center"
            >
                <Icon
                onClick={handleAuthAction} 
                aria-label="login" 
                as={icon} 
                fontSize="2xl"
                color={hovered ? "white" : "#9f9f9f"}
                />
            </Center>
        </Tooltip>
    );
};

export default LoginButton;
