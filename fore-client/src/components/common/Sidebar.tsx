import React, { useEffect } from 'react';
import { Avatar, Flex } from '@chakra-ui/react';
import NavItem from './NavItem';
import LoginButton from './LoginButton';
import Settings from './Settings';
import { FaHome, FaCog } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { BiCodeAlt, BiLogInCircle } from 'react-icons/bi';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Sidebar = (): React.ReactElement => {
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = React.useState(auth.currentUser != null ? true : false);
    const [userPhotoURL, setUserPhotoURL] = React.useState('');

    useEffect(() => {
        AuthCheck();
        return () => AuthCheck();
    }, [auth]);

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
            if (user.photoURL) {
                setUserPhotoURL(user.photoURL);
            }
        } else {
            setLoggedIn(false);
        }
    });

    return (
        <Flex
            position="sticky"
            mx="10px"
            height="95vh"
            my="2.5vh"
            boxShadow="10px 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius="20px"
            w="75px"
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#1f1f1f"
        >
            <Flex
                flexDir="column"
                alignItems="center"
                as="nav"
            >
                <NavItem icon={FaHome} tooltip="Dashboard" active={false}/>
                <NavItem icon={FiUser} tooltip="Profile" active={true} />
                <NavItem icon={BiCodeAlt} tooltip="Code" active={false}/>
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems="center"
                pb={4}
            >
                <Flex alignItems="center" flexDir="column">
                    <LoginButton icon={BiLogInCircle} loggedIn={auth.currentUser != null ? true : false}/>
                    <Settings icon={FaCog} tooltip="Settings" active={false}/>
                    <Avatar mt={4} size="sm" src={loggedIn ? userPhotoURL : ""} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Sidebar;