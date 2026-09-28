import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";

import Club from "../components/equipment/Club";
import { Club as ClubType } from "../types/fore";
import { gql, useQuery } from "@apollo/client";
import useAuth from "../auth/useAuth";
import AddClubDialog from "../components/equipment/AddClubDialog";
import { getClubImage } from "../utils/clubImages";

const MAX_CLUBS = 14;

const EmptySlot = ({ onAdd }: { onAdd: () => void }): React.ReactElement => (
    <Flex
        as="button"
        onClick={onAdd}
        borderRadius="15px"
        width="100%"
        maxWidth="200px"
        height="228px"
        justifySelf="center"
        border="2px dashed"
        borderColor="gray.300"
        color="gray.400"
        bg="transparent"
        direction="column"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="border-color 0.15s ease, color 0.15s ease"
        _hover={{ borderColor: "gray.500", color: "gray.600" }}
        aria-label="Add club"
    >
        <Box height="100px" opacity={0.35}>
            <img
                src={getClubImage("Putter")}
                alt=""
                style={{ height: "100%", width: "auto", transform: "rotate(-20deg)" }}
            />
        </Box>
        <Text fontSize="sm">Empty slot</Text>
    </Flex>
);

const Equipment = (): React.ReactElement => {
    const { auth } = useAuth();
    const [clubs, setClubs] = useState<ClubType[]>([]);
    const [showAddClubDialog, setShowAddClubDialog] = useState(false);

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
    const { data, loading, error, refetch } = useQuery(GET_CLUBS, {
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
    }, [data, loading, error]);

    const emptySlots = Math.max(MAX_CLUBS - clubs.length, 0);

    return (
        <VStack align="stretch" spacing={6}>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} columnGap={2} rowGap={6}>
                {clubs.map((club, i) => (
                    <Club key={i} club={club} />
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                    <EmptySlot key={`empty-${i}`} onAdd={() => setShowAddClubDialog(true)} />
                ))}
            </SimpleGrid>
            {showAddClubDialog ? (
                <AddClubDialog show={showAddClubDialog} close={(addedClub) => closeDialog(addedClub)} />
            ) : (
                ""
            )}
        </VStack>
    );
};

export default Equipment;
