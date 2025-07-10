import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
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
      {coursesLoading && <p>Loading...</p>}
      {coursesError && <p>Error loading courses: {coursesError.message}</p>}
      {courseData && courseData.getCourses && courseData.getCourses.length > 0 ?
        <ul>
          {courseData.getCourses.map((course: any) => (
            <li key={course.name}>
              <h2>{course.name}</h2>
              <p>Par: {course.par}</p>
              <p>Address: {course.city}, {course.country}</p>
              <h3>Tee Boxes:</h3>
              <ul>
                {course.teeBoxes.map((teeBox: any) => (
                  <li key={teeBox.name}>
                    {teeBox.name} - Slope: {teeBox.slope}, Course Rating: {teeBox.courseRtg}, Length: {teeBox.length} yards
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        : <p>No courses found.</p>
      }
    </div>
  );
};

export default Courses;
