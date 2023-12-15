import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage } from "@chakra-ui/react";
import React from "react";
import useAuth from "../../auth/useAuth";
import { Club } from "../../types/fore";
import { useForm } from "react-hook-form";

type AddClubProps = {
    show: boolean,
    close: (addedClub: boolean) => void
};

const AddClubDialog = ({show, close}: AddClubProps): React.ReactElement => {
    const { auth } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const ADD_CLUB = gql`
        mutation addClub($userID: String!, $club: ClubRequestDTO!) {
            addClub(userID: $userID, club: $club) {
                model
            }
        }
    `;


    const [addClub, { data, loading, error }] = useMutation(ADD_CLUB);

    function onSubmit(data: any) {
        addClub({ variables: { userID: auth.currentUser?.uid, club: data as Club }}); 
        close(true);
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
                            <FormLabel>Club Type</FormLabel>
                            <Input placeholder='3-Wood' {...register("clubType")}/>
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