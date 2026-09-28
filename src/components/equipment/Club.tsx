import React from "react";
import { Club as ClubType } from "../../types/fore";
import { Badge, Box, Image, Text, VStack } from "@chakra-ui/react";
import { getClubImage } from "../../utils/clubImages";

type ClubProps = {
    club: ClubType;
};

const Club = ({ club }: ClubProps): React.ReactElement => {
    return (
        <Box
            background="linear-gradient(180deg, #2D3748 0%, #1A202C 100%)"
            borderRadius="15px"
            width="100%"
            maxWidth="200px"
            justifySelf="center"
            height="228px"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.15s ease, box-shadow 0.15s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
        >
            <VStack spacing={1} pt={3} px={3} pb={2} height="100%">
                <Box
                    background="white"
                    borderRadius="10px"
                    width="100%"
                    height="125px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                    flexShrink={0}
                >
                    <Image
                        src={getClubImage(club.clubType)}
                        alt={`${club.brand} ${club.model} ${club.clubType}`}
                        objectFit="contain"
                        maxH="100%"
                        maxW="100%"
                    />
                </Box>
                <Text fontWeight="semibold" fontSize="md" color="gray.100" isTruncated width="100%" textAlign="center" lineHeight="1.3">
                    {club.brand}
                </Text>
                <Text fontSize="sm" color="gray.400" isTruncated width="100%" textAlign="center" lineHeight="1.3">
                    {club.model}
                </Text>
                <Badge colorScheme="green" borderRadius="full" px={2}>
                    {club.clubType}
                </Badge>
            </VStack>
        </Box>
    );
};

export default Club;
