import React from "react";
import { ClubType } from "../../types/equipTypes";
import { Box, Center } from "@chakra-ui/react";

type ClubProps = {
    club: ClubType
}

const Club = ({club}: ClubProps): React.ReactElement => {

    return (
        <Center background="gray.300"
             borderRadius="15px"
             width="200px"
             height="200px"
             mb={10}
        >
            <Box height="30px">
                Image Here
            </Box>
            {club.name}
            <br/>
            {club.value}
        </Center>
    );
};

export default Club;