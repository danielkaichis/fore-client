import React from "react";
import { Club as ClubType } from "../../types/fore";
import { Box, Center, Stack } from "@chakra-ui/react";

type ClubProps = {
    club: ClubType
}

const Club = ({club}: ClubProps): React.ReactElement => {

    return (
        <Center background="gray.300"
             borderRadius="15px"
             width="190px"
             height="200px"
             mb={10}
        >
            <Stack>
                <Box height="30px">
                    Image Here
                </Box>
                <Box>
                {club.brand}
                <br/>
                {club.model}
                <br/>
                {club.clubType}
                </Box>
            </Stack>
        </Center>
    );
};

export default Club;