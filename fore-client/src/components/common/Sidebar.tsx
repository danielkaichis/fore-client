import React, { useEffect, useState } from 'react';
import { Avatar, Flex, Center } from '@chakra-ui/react';

import { FaHome, FaBook } from 'react-icons/fa';
import { TbGolf } from 'react-icons/tb';
import { MdSportsGolf } from 'react-icons/md';
import { GiPodiumWinner } from 'react-icons/gi';

import { NavItem, Settings, AuthButton } from './index';
import { onAuthStateChanged } from 'firebase/auth';
import useAuth from '../../auth/useAuth';

const Sidebar = (): React.ReactElement => {
    const { auth }  = useAuth();
    const [userPhotoURL, setUserPhotoURL] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.photoURL) {
                setUserPhotoURL(user.photoURL);
            } else {
                setUserPhotoURL('');
            }
        });
    }, [auth]);

    return (
        <Flex position="sticky"
            height="95vh"
            boxShadow="10px 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius="20px"
            w="75px"
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#1f1f1f"
            className="sidebar"
        >
            <Center flexDir="column" alignItems="center" as="nav">
                <NavItem icon={FaHome} tooltip="Dashboard" redirectTo='/'/>
                <NavItem icon={FaBook} tooltip="Equipment" redirectTo='/equipment'/>
                <NavItem icon={MdSportsGolf} tooltip="Scores" redirectTo='/scores'/>
                <NavItem icon={TbGolf} tooltip="Courses" redirectTo='/courses'/>
                <NavItem icon={GiPodiumWinner} tooltip="PGA Leaderboard" redirectTo='/leaderboard'/>
            </Center>

            <Center alignItems="center" flexDir="column" pb={4}>
                <AuthButton />
                <Settings />
                <Avatar size="sm" bg="gray.400" src={userPhotoURL} />
            </Center>
        </Flex>
    );
};

export default Sidebar;