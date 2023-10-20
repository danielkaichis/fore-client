import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Game } from "../types/fore";

const Scores = (): React.ReactElement => {
    const games: Game[] = [
        {
            date: new Date("2022-01-01"),
            course: ["Pebble Beach"],
            holes: 18,
            teeBox: "Blue",
            score: 85,
            handicapDifferential: 12.4,
            scorecard: [
                {
                    holeNumber: 1,
                    par: 4,
                    length: [350, 325, 300, 275, 250],
                    handicap: 7,
                    score: 4
                },
                {
                    holeNumber: 2,
                    par: 3,
                    length: [200, 175, 150, 125, 100],
                    handicap: 17,
                    score: 3
                },
                {
                    holeNumber: 3,
                    par: 5,
                    length: [550, 525, 500, 475, 450],
                    handicap: 3,
                    score: 5
                },
            ]
        },
        {
            date: new Date("2022-01-02"),
            course: ["Augusta National"],
            holes: 18,
            teeBox: "White",
            score: 78,
            handicapDifferential: 3.2,
            scorecard: [
                {
                    holeNumber: 1,
                    par: 4,
                    length: [455, 430, 405, 380, 355],
                    handicap: 9,
                    score: 3
                },
                {
                    holeNumber: 2,
                    par: 5,
                    length: [575, 550, 525, 500, 475],
                    handicap: 1,
                    score: 6
                },
                {
                    holeNumber: 3,
                    par: 4,
                    length: [350, 325, 300, 275, 250],
                    handicap: 13,
                    score: 4,
                },
            ]
        },
        {
            date: new Date("2022-01-03"),
            course: ["St. Andrews"],
            holes: 18,
            teeBox: "Black",
            score: 90,
            handicapDifferential: 16.5,
            scorecard: [
                {
                    holeNumber: 1,
                    par: 4,
                    length: [375, 350, 325, 300, 275],
                    handicap: 5,
                    score: 3

                },
                {
                    holeNumber: 2,
                    par: 3,
                    length: [175, 150, 125, 100, 75],
                    handicap: 15,
                    score: 4
                },
                {
                    holeNumber: 3,
                    par: 5,
                    length: [570, 545, 520, 495, 470],
                    handicap: 1,
                    score: 4
                },
            ]
        }
    ];

    return (
        <TableContainer verticalAlign="top">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Course</Th>
                        <Th>Tee</Th>
                        <Th>Yds</Th>
                        <Th>Rating/Slope</Th>
                        <Th>Score</Th>
                        <Th>Par</Th>
                        <Th>HCI</Th>
                        <Th>Included in Handicap</Th>
                    </Tr>
                </Thead>
                <Tbody>
                { games.map((game: Game) => (
                        <Tr>
                            <Td>{game.date.toUTCString()}</Td>
                            <Td>{game.course}</Td>
                            <Td>{game.teeBox}</Td>
                            <Td>349 yds</Td>
                            <Td>76/144</Td>
                            <Td>{game.score}</Td>
                            <Td>72</Td>
                            <Td>{game.handicapDifferential}</Td>
                            {/* TODO: calculate this based on handicap card */}
                            <Td>yes</Td>
                        </Tr>
                    ))
                }
            </Tbody>
            </Table>
        </TableContainer>
    );
};

export default Scores;