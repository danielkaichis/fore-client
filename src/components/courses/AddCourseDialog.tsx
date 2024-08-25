import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, 
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
  NumberInput, NumberInputField, Box, Stack, Collapse, Spacer, HStack, Flex 
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Course,  TeeBox } from "../../types/fore";
import useAuth from "../../auth/useAuth";
import { useForm, useFieldArray, Controller } from "react-hook-form";

type AddCourseProps = {
    show: boolean,
    close: (addedClub: boolean) => void
};

const AddCourseDialog = ({show, close}: AddCourseProps): React.ReactElement => {
    const { auth } = useAuth();
    const { control, register, handleSubmit } = useForm({
      defaultValues: {
        course: {
          name: '',
          par: '',
          teeBoxes: [{ name: '', slope: '', courseRtg: '', length: '' }] // Initial structure with 4 subfields
        }
      }
    });

    const { fields: teeFields, append: appendTee, remove: removeTee } = useFieldArray({
      control,
        name: 'course.teeBoxes'
    });

    const ADD_COURSE = gql`
        mutation addCourse($userID: String!, $course: CourseInput!) {
            addCourse(userID: $userID, course: $course) {
              name
            }
        }
    `;

    const [addCourse] = useMutation(ADD_COURSE);
  
    function onSubmit(data: any) {
        data.course.teeBoxes = data.course.teeBoxes.map((tee: any) => {
          return {
            ...tee,
            slope: parseInt(tee.slope),
            courseRtg: parseFloat(tee.courseRtg),
            length: parseInt(tee.length)
          } as TeeBox;
        });
        addCourse({ variables: { userID: auth.currentUser?.uid, course: data.course as Course }}).catch((err: any) => {
            // TODO: add popup to display error text
            console.log(err.message);
        }); 
        close(true);
    };

    const [collapsedTees, setCollapsedTees] = useState(teeFields.map(() => false));

    const toggleCollapse = (index: number) => {
      setCollapsedTees((prev) => {
        const newCollapsedTees = [...prev];
        newCollapsedTees[index] = !newCollapsedTees[index];
        return newCollapsedTees;
      });
    };

    return (
        <Modal isOpen={show} onClose={() => close(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Enter Round</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input placeholder='Granite' {...register("course.name")}/>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Par</FormLabel>
                      <NumberInput>
                        <NumberInputField placeholder="72" {...register("course.par", { valueAsNumber: true })} />
                      </NumberInput>
                    </FormControl>
                    <Box py={4}>
                      {teeFields.map((item, index) => (
                        <Box key={item.id} borderWidth="1px" borderRadius="lg" my={2} px={4} py={2}>
                          <Flex align="center" justify="center">
                            <FormLabel mb={0}>Tee {index + 1}</FormLabel>
                            <Spacer />
                            <Button
                              onClick={() => toggleCollapse(index)}
                              aria-label="Toggle Collapse"
                            >
                            {collapsedTees[index] ? "Expand" : "Collapse"}
                            </Button>
                          </Flex>
                          <Collapse in={!collapsedTees[index]} animateOpacity>
                          <Stack spacing={3}>
                              <Box>
                                <FormLabel>Name</FormLabel>
                                <Controller
                                  name={`course.teeBoxes.${index}.name`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input {...field} placeholder="Blue" />
                                  )}
                                />
                              </Box>
                              <HStack spacing={4} mt={2}>
                                <Box>
                                  <FormLabel>Course Rating</FormLabel>
                                  <Controller
                                    name={`course.teeBoxes.${index}.courseRtg`}
                                    control={control}
                                    render={({ field }) => (
                                      <Input {...field} placeholder="72.2" type="number" />
                                    )}
                                  />
                                </Box>
                                <Box>
                                  <FormLabel>Slope</FormLabel>
                                  <Controller
                                    name={`course.teeBoxes.${index}.slope`}
                                    control={control}
                                    render={({ field }) => (
                                      <Input {...field} placeholder="144" type="number" />
                                    )}
                                  />
                                </Box>
                              </HStack>
                              <Box>
                                <FormLabel>Length (Yards)</FormLabel>
                                <Controller
                                  name={`course.teeBoxes.${index}.length`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input {...field} placeholder="7104" type="number" />
                                  )}
                                />
                              </Box>
                              <Button mt={2} colorScheme="red" onClick={() => removeTee(index)}>
                                Remove Tee
                              </Button>
                            </Stack>
                          </Collapse>        
                        </Box>
                      ))}
                    </Box>
                    <Button onClick={() => appendTee({ name: '', slope: '', courseRtg: '', length: '' })}>Add Tee</Button>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant='outline' colorScheme='red' mr={3} onClick={() => close(false)}>Cancel</Button>
                    <Button type="submit" colorScheme='blue'>Add Course</Button>
                  </ModalFooter>
              </form>
            </ModalContent>
        </Modal>
    );
};

export default AddCourseDialog;
