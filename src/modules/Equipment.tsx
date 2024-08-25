import React, { useEffect, useState } from "react";
import { Box, Button, Wrap, WrapItem } from "@chakra-ui/react";

import Club from "../components/equipment/Club";
import { Club as ClubType } from "../types/fore";
import { gql, useQuery } from "@apollo/client";
import useAuth from "../auth/useAuth";
import AddClubDialog from "../components/equipment/AddClubDialog";

const Equipment = (): React.ReactElement => {
    const { auth } = useAuth();
    const [clubs, setClubs] = useState<ClubType[]>([]);
    const [ showAddClubDialog, setShowAddClubDialog ] = useState(false);
    
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
    const { data, loading, error, refetch} = useQuery(GET_CLUBS, {
        variables: { userID: auth.currentUser?.uid },
    });

    function closeDialog(addedClub: boolean) {
        setShowAddClubDialog(false);
        if (addedClub) refetch();
    }

    useEffect(() => {
        if (data && !loading && !error) {
            setClubs(data.getClubs);
        }
    }, [data]);
    
    return (
        // TODO: change to use a grid with 14 slots, and put each club into the slots in increasing order,
        // IE put first club returned in index 0, then 1, etc.
        <Box>
            <Button onClick={() => setShowAddClubDialog(true)}>Add Club</Button>
            <Wrap>
                { clubs.map((club, i) => (
                    <WrapItem key={i} px={2}>
                        <Club key={i} club={club}/>
                    </WrapItem>
                ))}
            </Wrap>
            {showAddClubDialog ? <AddClubDialog show={showAddClubDialog} close={(addedClub) => closeDialog(addedClub)}/> : ''}
        </Box>
    );
};

export default Equipment;
