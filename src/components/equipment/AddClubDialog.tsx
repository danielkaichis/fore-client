import { gql, useMutation } from "@apollo/client";
import { 
    Button, FormControl, FormLabel, 
    HStack, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, 
    ModalFooter, ModalHeader, ModalOverlay,  
    Select, useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import useAuth from "../../auth/useAuth";
import { Club } from "../../types/fore";
import { METALWOODS, IRONS, WEDGES, PUTTERS } from "../../utils/clubImages";
import { useForm } from "react-hook-form";

type AddClubProps = {
    show: boolean,
    close: (addedClub: boolean) => void
};

const AddClubDialog = ({show, close}: AddClubProps): React.ReactElement => {
    const { auth } = useAuth();
    const { register, handleSubmit } = useForm();
    const toast = useToast()
    const [clubOptions, setClubOptions] = useState<string[]>([]);

    const clubTypes = ['Metalwood', 'Iron', 'Wedge', 'Putter'] as const;

    const ADD_CLUB = gql`
        mutation addClub($userID: String!, $club: ClubInput!) {
            addClub(userID: $userID, club: $club) {
                model
            }
        }
    `;

    const [addClub] = useMutation(ADD_CLUB);

    function onSubmit(data: any) {
        addClub({ variables: { userID: auth.currentUser?.uid, club: data as Club }}).catch((err) => {
            toast({
                title: `${err.message}`,
                status: "error",
                isClosable: true,
            });
        }); 
        close(true);
    };

    const handleClubTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === 'Metalwood') setClubOptions([...METALWOODS]);
        if (event.target.value === 'Iron') setClubOptions([...IRONS]);
        if (event.target.value === 'Wedge') setClubOptions([...WEDGES]);
        if (event.target.value === 'Putter') setClubOptions([...PUTTERS]);
    };

    return (
        <Modal isOpen={show} onClose={() => close(false)}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Brand</FormLabel>
                            <Input placeholder='Taylormade' {...register("brand")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Model</FormLabel>
                            <Input placeholder='TS2' {...register("model")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Club</FormLabel>
                            <HStack>
                                <Select placeholder='Select Club Type' onChange={handleClubTypeChange}>
                                    {clubTypes.map((clubType, i) => (
                                        <option key={i} value={clubType}>{clubType}</option>
                                    ))}
                                </Select>
                                <Select placeholder='Select Club' {...register("clubType")}>
                                    {clubOptions.map((club, i) => (
                                        <option key={i} value={club}>{club}</option>
                                    ))}
                                </Select>
                            </HStack>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Flex</FormLabel>
                            <Input placeholder='Stiff' {...register("flex")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Shaft</FormLabel>
                            <Input placeholder='Fujikura' {...register("shaft")}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => close(false)}>
                        Close
                        </Button>
                        <Button type="submit" variant='ghost'>Add Club</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddClubDialog;
