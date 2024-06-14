import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import { Game } from "../../types/fore";
import useAuth from "../../auth/useAuth";
import { useForm } from "react-hook-form";

type AddScoreProps = {
    show: boolean,
    close: (addedClub: boolean) => void
};

const AddScoreDialog = ({show, close}: AddScoreProps): React.ReactElement => {
    const { auth } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const ADD_GAME = gql`
        mutation addGame($userID: String!, $game: GameRequestDTO!) {
            addGame(userID: $userID, game: $game) {
                score
            }
        }
    `;

    const [addClub] = useMutation(ADD_GAME);

    function onSubmit(data: any) {
        addClub({ variables: { userID: auth.currentUser?.uid, club: data as Game }}).catch((err) => {
            // TODO: add popup to display error text
            console.log(err.message);
        }); 
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
                            <FormLabel>Date</FormLabel>
                            <Input placeholder='Jan 1' {...register("date")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Course</FormLabel>
                            <Input placeholder='Granite' {...register("course")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Holes</FormLabel>
                            <Input placeholder='18' {...register("holes")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Tee</FormLabel>
                            <Input placeholder='blue' {...register("teeBox")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Score</FormLabel>
                            <Input placeholder='72' {...register("score")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Scorecard?</FormLabel>
                            <Input placeholder='idk' {...register("idk")}/>
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

export default AddScoreDialog;
