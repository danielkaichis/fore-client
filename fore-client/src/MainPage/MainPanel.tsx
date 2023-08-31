import React, { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Notepad from "../modules/Notepad";
import Todo from "../modules/Todo";
import { gql, useQuery } from "@apollo/client";
import { NoteColors, NoteResponseDTO } from "../types/fore";
import { TodoStatuses, TodoResponseDTO } from "../types/fore";

const MainPanel = (): React.ReactElement => {
    const [ notes, setNotes ] = useState<Array<NoteResponseDTO>>([]);
    const [ todos, setTodos ] = useState<Array<TodoResponseDTO>>([]);
    const [localState, setLocalState] = useState(null);

    const GET_NOTES = gql`
        query getNotes($userID: String!) {
            getNotes(userID: $userID) {
                color
                content
            }
        }
    `;

    const GET_TODOS = gql`
        query getTodos($userID: String!) {
            getTodos(userID: $userID) {
                description
                status
                dueDate
            }
        }
    `;

    const { data, loading, error } = useQuery(GET_NOTES, {
        variables: { userID: localStorage.getItem("userID") },
    });

    const { data: todoData, loading: todoLoading, error: todoError } = useQuery(GET_TODOS, {
        variables: { userID: localStorage.getItem("userID") },
    });

    if (!loading && !error && !todoLoading && !todoError && !localState) {
        setNotes([]);
        Object.keys(NoteColors).forEach((color) => {
            const colIndex = data.getNotes.findIndex((note: NoteResponseDTO) => note.color === color);
            const content = colIndex !== -1 ? data.getNotes[colIndex]?.content : "";
            const newNote: NoteResponseDTO = { 
                color: color as NoteColors, 
                content
            };
            setNotes(notes => [...notes, newNote]);
        });
        setTodos(todoData.getTodos);
        console.log(todos);
        if (notes.length > 0 || data.getNotes.length === 0) {
            setLocalState(data);
        }
    }

    return (
        <Grid 
            templateRows='repeat(4, 1fr)'
            templateColumns='repeat(4, 1fr)'
            h="auto" 
            w="100%"
            gap={6}
            my={5}
            mx={4}
        >
            <GridItem  
                borderRadius="2xl" 
                backgroundColor="#ffffff" 
                boxShadow="md"
                colSpan={3} 
                rowSpan={2}
            >
                <Todo todos={todos}/>
            </GridItem>
            <GridItem 
                backgroundColor="#ffffff" 
                borderRadius="2xl" 
                boxShadow="md"
                colSpan={1}
                rowSpan={2}
            >
                {!loading && <Notepad notes={notes} />}
            </GridItem>

        </Grid >
    );
};

export default MainPanel;