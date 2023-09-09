import React from 'react';
import { Avatar, Flex, Center } from '@chakra-ui/react';

import { FaHome, FaCog, FaBook } from 'react-icons/fa';
import { TbGolf } from 'react-icons/tb';
import { MdSportsGolf } from 'react-icons/md';
import { GiPodiumWinner } from 'react-icons/gi';
import { BiLogInCircle } from 'react-icons/bi';

import { Settings, LoginButton, NavItem } from './index';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Sidebar = (): React.ReactElement => {
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = React.useState(auth.currentUser != null ? true : false);
    const [userPhotoURL, setUserPhotoURL] = React.useState('');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
            if (user.photoURL) {
                setUserPhotoURL(user.photoURL);
            }
        } else {
            setLoggedIn(false);
            setUserPhotoURL('');
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
            <Center
                flexDir="column"
                alignItems="center"
                as="nav"
            >
                <NavItem icon={FaHome} tooltip="Dashboard" active={false} redirectTo='/'/>
                <NavItem icon={FaBook} tooltip="Equipment" active={true} redirectTo='/equipment'/>
                <NavItem icon={MdSportsGolf} tooltip="Scores" active={false} redirectTo='/scores'/>
                <NavItem icon={TbGolf} tooltip="Courses" active={false} redirectTo='/courses'/>
                <NavItem icon={GiPodiumWinner} tooltip="PGA Leaderboard" active={false} redirectTo='/leaderboard'/>
            </Center>


            <Center alignItems="center" flexDir="column" pb={4}>
                <LoginButton icon={BiLogInCircle} loggedIn={loggedIn}/>
                <Settings icon={FaCog} tooltip="Settings" active={false}/>
                <Avatar size="sm" bg="gray.400" src={userPhotoURL} />
            </Center>
        </Flex>
    );
};

export default Sidebar;