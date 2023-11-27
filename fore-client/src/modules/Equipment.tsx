import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { Box, Button, Wrap, WrapItem } from "@chakra-ui/react";

import Club from "../components/equipment/Club";
import { ClubType } from "../types/fore";
import { gql, useQuery } from "@apollo/client";

const Equipment = (): React.ReactElement => {
    const [ clubs, setClubs ] = useState<Array<any>>([]);
    const auth = getAuth();
    
    // get club data from server

    const GET_CLUBS = gql`
        query getClubs($userID: String!) {
            getClubs(userID: $userID) {
                brand
                model
                clubType
                flex
                shaft
            }
        }
    `;
    const { data, loading, error} = useQuery(GET_CLUBS, {
        variables: { userID: auth.currentUser?.uid }
    });

    
    return (
        // TODO: change to use a grid with 14 slots, and put each club into the slots in increasing order,
        // IE put first club returned in index 0, then 1, etc.
        <Box>
            <Button onClick={() => console.log(clubs)}>Add Club</Button>
            <Wrap>
                { clubs.map((club) => (
                    <WrapItem key={club.name} px={2}>
                        <Club key={club.name} club={club}/>
                    </WrapItem>
                ))}
            </Wrap>
        </Box>
    );
};

export default Equipment;