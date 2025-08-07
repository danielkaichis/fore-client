import React, { useState } from "react";
import { Box, Button, Divider, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import AddCourseDialog from "../components/courses/AddCourseDialog"
import { gql, useQuery } from "@apollo/client";
import { getAuth } from "firebase/auth";


const Courses = (): React.ReactElement => {
  const auth = getAuth();
  const [ showAddCourseDialog, setShowAddCourseDialog ] = useState(false);

  const GET_COURSES = gql`
      query getCourses($userID: String!) {
          getCourses(userID: $userID) {
              name
              par
              teeBoxes {
                  name
                  slope
                  courseRtg
                  length
              }
              city
              country
          }
      }
  `;
  const { data: courseData, loading: coursesLoading, error: coursesError, refetch: refetchCourses} = useQuery(GET_COURSES, {
      variables: { userID: auth.currentUser?.uid },
  });

  async function closeDialog(addedCourse: boolean) {
    setShowAddCourseDialog(false);
    if (addedCourse) {
      await refetchCourses();
    }
  }
  

  return (
    <div>
      <Button colorScheme="blue" onClick={() => setShowAddCourseDialog(true)}>Add Course</Button>
      {showAddCourseDialog ? <AddCourseDialog show={showAddCourseDialog} close={(addedCourse) => closeDialog(addedCourse)}/> : ''}
      <h1>Courses</h1>
      {coursesLoading && !coursesError && <p>Loading...</p>}
      {coursesError && <p>Error loading courses: {coursesError.message}</p>}
      {!coursesLoading && courseData && courseData.getCourses && courseData.getCourses.length > 0 ?
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {courseData.getCourses.map((course: any) => (
            <Box
              key={course.name}
              p={5}
              borderWidth="1px"
              borderRadius="2xl"
              boxShadow="md"
            >
              <Stack spacing={3}>
                <Heading size="md">{course.name}</Heading>
                <p><strong>Par:</strong> {course.par}</p>
                <p><strong>Address:</strong> {course.city}, {course.country}</p>
                <Divider />
                <Heading fontSize="1rem" fontWeight="600" mt={2}>Tees</Heading>
                <Stack spacing={2}>
                  {course.teeBoxes.map((teeBox: any) => (
                    <Box
                      key={teeBox.name}
                      p={3}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg="gray.50"
                    >
                      <Text fontWeight="medium">{teeBox.name}</Text>
                      <Text fontSize="sm">
                        Slope: {teeBox.slope}, Rtg: {teeBox.courseRtg}, Length: {teeBox.length} yards
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
        : <p>No courses found.</p>
      }
    </div>
  );
};

export default Courses;
