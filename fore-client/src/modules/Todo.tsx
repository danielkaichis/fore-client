import { gql, useMutation } from '@apollo/client';
import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TodoRequestDTO, TodoResponseDTO, TodoStatuses } from '../types/devDash';

type TodoProps = {
    todos: TodoResponseDTO[];
}

const Todo = ({
    todos
}: TodoProps): React.ReactElement => {
    const [ newTodos, setNewTodos ] = useState<TodoResponseDTO[]>(todos);

    const CREATE_TODO = gql`
        mutation createTodo($todo: TodoRequestDTO!) {
            createTodo(todo: $todo) {
                content
            }
        }
    `;

    const [ createTodo ] = useMutation<{
        createTodo: TodoResponseDTO;
    }>(CREATE_TODO);

    const saveTodo = (description: string, status: TodoStatuses) => {
        if (localStorage.getItem("userID") != null) {
            const userID = String(localStorage.getItem("userID"));
            const todo: TodoRequestDTO = {
                userID,
                description,
                status,
            };
            createTodo({ variables: { userID, todo } }).catch((error) => console.log(error));
            console.log("Created/Updated todo!");        
        };
    };
    
    
    return (
        <p>Todo</p>
    )
}; 

export default Todo;