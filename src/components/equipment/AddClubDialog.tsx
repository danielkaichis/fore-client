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

    const clubTypes = ['Metalwood', 'Iron', 'Wedge', 'Putter'];
    const metalwoods = ['Driver', '3-Wood', '5-Wood', '7-Wood', '3-Hybrid', '5-Hybrid'];
    const irons = ['1-Iron', '2-Iron', '3-Iron', '4-Iron', '5-Iron', '6-Iron', '7-Iron', '8-Iron', '9-Iron'];
    const wedges = ['Pitching Wedge', 'Gap Wedge', 'Sand Wedge', 'Lob Wedge', '50 Degree', '52-Degree', '56 Degree', '60-Degree'];

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
        if (event.target.value === 'Metalwood') setClubOptions(metalwoods);
        if (event.target.value === 'Iron') setClubOptions(irons);
        if (event.target.value === 'Wedge') setClubOptions(wedges);
        if (event.target.value === 'Putter') setClubOptions(['Putter']);
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
