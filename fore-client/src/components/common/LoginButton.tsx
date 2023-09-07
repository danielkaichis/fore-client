import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Tooltip, Flex, MenuButton, useBoolean, Icon, Menu } from "@chakra-ui/react";
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
        signInWithPopup(auth, provider).then(result => {
            // TODO: find way to not use local storage 
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential && credential.accessToken) {
                const token = credential.accessToken;
                localStorage.setItem("google-credential", token);
            }
            localStorage.setItem("userID", result.user.uid);
            setAuthorizing(false);
        }).catch(error => {
            console.log(error);
            setAuthorizing(false);
        });
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
        <Tooltip hasArrow label={loggedIn ? "Sign Out" : "Login"} bg='black' color='white' placement="right" borderRadius={4} h="3vh" my="auto">
            <Flex
                onMouseEnter={setHovered.on} 
                onMouseLeave={setHovered.off}
                mt={30}
                flexDir="column"
                alignItems="center"
            >
                <Menu placement="right">
                    <MenuButton w="100%" py="5%" onClick={handleAuthAction}>
                        <Flex color={hovered ? "white" : "#9f9f9f"}>
                            <span>
                                <Icon mt="0.9vh" as={icon} fontSize="xl"/>
                            </span>
                        </Flex>
                    </MenuButton>
                </Menu>
            </Flex>
        </Tooltip>
    );
};

export default LoginButton;
