import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import Club from "../components/equipment/Club";
import { ClubType } from "../types/equipTypes";
import { Wrap, WrapItem } from "@chakra-ui/react";

const Equipment = (): React.ReactElement => {
    const clubs: ClubType[] = [
        {
            name: '4-iron',
            value: 4
        },
        {
            name: '5-iron',
            value: 5
        },
		{
            name: '6-iron',
            value: 6
        },
		{
            name: '7-iron',
            value: 7
        },
		{
            name: '8-iron',
            value: 8
        },
		// {
        //     name: '9-iron',
        //     value: 9
        // },
		// {
        //     name: '50 wedge',
        //     value: 50
        // },
		// {
        //     name: '55 wedge',
        //     value: 55
        // },
		// {
        //     name: '60 wedge',
        //     value: 60
        // },
		// {
        //     name: 'pitching wedge',
        //     value: 2
        // },
		// {
        //     name: '3-wood',
        //     value: 3
        // },
		// {
        //     name: 'hybrid',
        //     value: 10
        // },
		// {
        //     name: 'driver',
        //     value: 11
        // },
		// {
        //     name: 'putter',
        //     value: 1
        // },
    ];
    const auth = getAuth();
    
    // get club data from server
    
    return (
        <Wrap>
            { clubs.map((club) => (
				<WrapItem key={club.name}>
                	<Club key={club.name} club={club}/>
				</WrapItem>
            ))}
        </Wrap>
    );
};

export default Equipment;