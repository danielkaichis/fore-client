import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Course, Game, TeeBox } from "../../types/fore";
import useAuth from "../../auth/useAuth";
import { useForm } from "react-hook-form";

type AddScoreProps = {
    courses: Course[],
    show: boolean,
    close: (addedClub: boolean) => void
};

const AddScoreDialog = ({courses, show, close}: AddScoreProps): React.ReactElement => {
    const { auth } = useAuth();
    const { register, handleSubmit } = useForm();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [teeOptions, setTeeOptions] = useState<TeeBox[]>([]);

    const ADD_GAME = gql`
        mutation addGame($userID: String!, $game: GameInput!) {
            addGame(userID: $userID, game: $game) {
                score
            }
        }
    `;

    const [addGame] = useMutation(ADD_GAME);

    function onSubmit(data: any) {
        addGame({ variables: { userID: auth.currentUser?.uid, game: data.game as Game }}).catch((err) => {
            // TODO: add popup to display error text
            console.log(err.message);
        }); 
        close(true);
    };

    const onCourseChange = (event: any) => {
        const selectedCourseName = event.target.value;
        setSelectedCourse(selectedCourseName);
    };

    useEffect(() => {
        if (selectedCourse) {
            const course = courses.find(c => c.name === selectedCourse);
            if (course) {
                setTeeOptions(course.teeBoxes); 
            } else {
                setTeeOptions([]);
            }
        } else {
            setTeeOptions([]);
        }
    }, [selectedCourse, courses]);

    return (
        <Modal isOpen={show} onClose={() => close(false)}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Enter Round</ModalHeader>
            <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Date</FormLabel>
                            <Input type="date" {...register("game.date")} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Course</FormLabel>
                            <Select placeholder=' ' {...register("game.course", { onChange: onCourseChange })}>
                                {courses.map((course: Course) => <option key={course.name} value={course.name}>{course.name}</option> )}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Holes</FormLabel>
                            <RadioGroup defaultValue="18">
                                <Stack spacing={4} direction="row">
                                    <Radio value="9" {...register("game.holes", { valueAsNumber: true })}>9</Radio>
                                    <Radio value="18" {...register("game.holes", { valueAsNumber: true })}>18</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Tees</FormLabel>
                            <Select placeholder=' ' {...register("game.teeBox")}>
                                {teeOptions.map((tee: TeeBox) => <option key={tee.name} value={tee.name}>{tee.name} - {tee.courseRtg}/{tee.slope}</option> )}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Score</FormLabel>
                            <NumberInput>
                                <NumberInputField placeholder="72" {...register("game.score", { valueAsNumber: true })} />
                            </NumberInput>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' colorScheme='red' mr={3} onClick={() => close(false)}>Cancel</Button>
                        <Button type="submit" colorScheme='blue'>Add Round</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddScoreDialog;
