import React, { useState } from "react";
import { Tooltip, Center, Icon } from "@chakra-ui/react";
import useAuth from "../../auth/useAuth";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";

const AuthButton = (): React.ReactElement => {
    const { auth, handleAuthAction } = useAuth();
    const [ loggedIn, setLoggedIn ] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    return(
        <Tooltip hasArrow label={loggedIn ? "Sign Out" : "Login"} bg='black' color='white' placement="right" borderRadius={4}>
            <Center>
                <Icon onClick={handleAuthAction} 
                    aria-label="login" 
                    as={loggedIn ? BiLogOutCircle : BiLogInCircle} 
                    fontSize="2xl"
                    color="#9f9f9f"
                    _hover={{color: "white"}}
                    cursor="pointer"
                />
            </Center>
        </Tooltip>
    );
};

export default AuthButton;
