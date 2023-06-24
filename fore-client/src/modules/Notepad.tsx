import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { NoteRequestDTO, NoteResponseDTO } from "../types/devDash";
import { NoteColors } from "../types/devDash";
import { BsFillCircleFill } from "react-icons/bs";

type NotepadProps = {
    notes: NoteResponseDTO[];
} 

const Notepad = ({
    notes
}: NotepadProps): React.ReactElement => {
    const [ newNotes, setNewNotes ] = useState<NoteResponseDTO[]>(notes);
    const [ noteContent, setNoteContent ] = useState<string>(notes[0]?.content);
    const handleNoteContentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNoteContent(event.target.value);
        newNotes.some((note, index) => {
            if (note.color === activeColor) {
                newNotes[index] = {
                    color: note.color,
                    content: String(event.target.value)
                }
            }
            return setNewNotes(newNotes);
        });
    }
    const [ activeColor, setActiveColor ] = useState(NoteColors.RED);
    
    const CREATE_NOTE = gql`
        mutation createNote($note: NoteRequestDTO!) {
            createNote(note: $note) {
                content
            }
        }
    `;
    const [ createNote ] = useMutation<{
        createNote: NoteResponseDTO;
    }>(CREATE_NOTE);
    
    const saveNote = () => {
        if (noteContent && localStorage.getItem("userID") != null) {
            const userID = String(localStorage.getItem("userID"));
            const note: NoteRequestDTO = {
                userID,
                color: activeColor,
                content: noteContent,
            };
            createNote({ variables: { userID, note } }).catch((error) => console.log(error));
            console.log("Created/Updated note!");
        }
    };

    return (
        // TODO: consider removing save button and saving on exit or on a general save button for the page like "save all"
        
        <Tabs size="md" variant="enclosed" isFitted onChange={(index) => {
            setActiveColor(Object.values(NoteColors)[index])
            newNotes.forEach((note: NoteResponseDTO) => {
                if (note.color === Object.values(NoteColors)[index]) {
                    setNoteContent(note.content);
                }
            });
        }}
        >
            <TabList>
                {Object.keys(NoteColors).map((color, index) => (
                    <Tab borderTopLeftRadius={color === NoteColors.RED ? "2xl" : "md"} borderTopRightRadius={color === NoteColors.PURPLE ? "2xl": "md"} color={color} key={index}><BsFillCircleFill color={color === NoteColors.YELLOW ? "#fdb915": color}/></Tab>
                ))}
            </TabList>
            <TabPanels>
                {Object.keys(NoteColors).map((index) => (
                    <TabPanel key={index}>
                        <Textarea
                            border="none"
                            height="36.5vh"
                            focusBorderColor="none"
                            backgroundColor="#ffffff"
                            placeholder="Type new note" 
                            value={noteContent}
                            onChange={handleNoteContentChange}
                            // can change to vertical later once drag and drop grid is implemented
                            resize="none"
                        />
                    </TabPanel>
                ))}
            </TabPanels>
            <Button 
                borderBottomRadius="2xl" 
                borderTopRadius="none" 
                width="100%"
                height="30px"
                alignContent={"bottom"}
                backgroundColor={activeColor === NoteColors.YELLOW ? "#fdb915": activeColor}  
                onClick={saveNote}
                _hover={{ opacity: 0.5}}
                color="white"
            >
                Save Note
            </Button>
        </Tabs>
    );
};

export default Notepad;