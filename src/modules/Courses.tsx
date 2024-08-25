import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import AddCourseDialog from "../components/courses/AddCourseDialog"


const Courses = (): React.ReactElement => {
  const [ showAddCourseDialog, setShowAddCourseDialog ] = useState(false);

  async function closeDialog() {
    setShowAddCourseDialog(false);
  }

  return (
    <div>
      <Button colorScheme="blue" onClick={() => setShowAddCourseDialog(true)}>Add Course</Button>
      {showAddCourseDialog ? <AddCourseDialog show={showAddCourseDialog} close={() => closeDialog()}/> : ''}
    </div>
  );
};

export default Courses;
