import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Course, Game } from "../../types/fore";
import useAuth from "../../auth/useAuth";
import { useForm } from "react-hook-form";

type AddScoreProps = {
    courses: Course[],
    show: boolean,
    close: (addedClub: boolean) => void
};

const AddScoreDialog = ({courses, show, close}: AddScoreProps): React.ReactElement => {
    const { auth } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const ADD_GAME = gql`
        mutation addGame($userID: String!, $game: GameRequestDTO!) {
            addGame(userID: $userID, game: $game) {
                score
            }
        }
    `;

    const [addGame] = useMutation(ADD_GAME);

    function onSubmit(data: any) {
        data.course.name = data.game.course;
        addGame({ variables: { userID: auth.currentUser?.uid, game: data.game as Game, course: data.course as Course }}).catch((err) => {
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
                            <Input placeholder='Jan 1, 2024' {...register("game.date")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Course</FormLabel>
                            <Select placeholder=' ' {...register("game.course")}>
                                {courses.map((course: Course) => <option key={course.name} value={course.name}>{course.name}</option> )}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Slope</FormLabel>
                            <Input placeholder='Granite' {...register("course.slope")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Rating</FormLabel>
                            <Input placeholder='Granite' {...register("course.courseRtg")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Holes</FormLabel>
                            <Input placeholder='9 or 18' {...register("game.holes")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Tee</FormLabel>
                            <Input placeholder='Blue' {...register("game.teeBox")}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Score</FormLabel>
                            <Input placeholder='72' {...register("game.score")}/>
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
