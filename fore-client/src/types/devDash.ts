import { TodoComment } from "typescript";

export enum NoteColors {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW",
    PURPLE = "PURPLE",
}

export enum TodoStatuses {
    BACKLOG = "BACKLOG",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETE = "COMPLETE",
}

export type Settings = {
    theme: string;
}

export type NoteRequestDTO = {
    userID: string;
    color: NoteColors;
    content: string;
}

export type NoteResponseDTO = {
    color: NoteColors;
    content: string;
}

export type TodoRequestDTO = {
    userID: string;
    description: string;
    status: TodoStatuses;
}

export type TodoResponseDTO = {
    description: string;
    status: TodoStatuses;
}