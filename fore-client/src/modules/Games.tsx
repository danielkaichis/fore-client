import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Course, Game } from "../types/fore";
import { gql, useQuery } from "@apollo/client";
import { getAuth } from "firebase/auth";
import AddScoreDialog from "../components/games/AddScoreDialog";

const Scores = (): React.ReactElement => {
    const auth = getAuth();
    const [ showAddScoreDialog, setShowAddScoreDialog ] = useState(false);
    const [ games, setGames ] = useState<Game[]>([]);
    const [ courses, setCourses ] = useState<Course[]>([]); 

    // const games: Game[] = [
    //     {
    //         date: new Date("2022-01-01"),
    //         course: ["Pebble Beach"],
    //         holes: 18,
    //         teeBox: "Blue",
    //         score: 85,
    //         handicapDifferential: 12.4,
    //         scorecard: [
    //             {
    //                 holeNumber: 1,
    //                 par: 4,
    //                 length: [350, 325, 300, 275, 250],
    //                 handicap: 7,
    //                 score: 4
    //             },
    //             {
    //                 holeNumber: 2,
    //                 par: 3,
    //                 length: [200, 175, 150, 125, 100],
    //                 handicap: 17,
    //                 score: 3
    //             },
    //             {
    //                 holeNumber: 3,
    //                 par: 5,
    //                 length: [550, 525, 500, 475, 450],
    //                 handicap: 3,
    //                 score: 5
    //             },
    //         ]
    //     },
    //     {
    //         date: new Date("2022-01-02"),
    //         course: ["Augusta National"],
    //         holes: 18,
    //         teeBox: "White",
    //         score: 78,
    //         handicapDifferential: 3.2,
    //         scorecard: [
    //             {
    //                 holeNumber: 1,
    //                 par: 4,
    //                 length: [455, 430, 405, 380, 355],
    //                 handicap: 9,
    //                 score: 3
    //             },
    //             {
    //                 holeNumber: 2,
    //                 par: 5,
    //                 length: [575, 550, 525, 500, 475],
    //                 handicap: 1,
    //                 score: 6
    //             },
    //             {
    //                 holeNumber: 3,
    //                 par: 4,
    //                 length: [350, 325, 300, 275, 250],
    //                 handicap: 13,
    //                 score: 4,
    //             },
    //         ]
    //     },
    //     {
    //         date: new Date("2022-01-03"),
    //         course: ["St. Andrews"],
    //         holes: 18,
    //         teeBox: "Black",
    //         score: 90,
    //         handicapDifferential: 16.5,
    //         scorecard: [
    //             {
    //                 holeNumber: 1,
    //                 par: 4,
    //                 length: [375, 350, 325, 300, 275],
    //                 handicap: 5,
    //                 score: 3
    //             },
    //             {
    //                 holeNumber: 2,
    //                 par: 3,
    //                 length: [175, 150, 125, 100, 75],
    //                 handicap: 15,
    //                 score: 4
    //             },
    //             {
    //                 holeNumber: 3,
    //                 par: 5,
    //                 length: [570, 545, 520, 495, 470],
    //                 handicap: 1,
    //                 score: 4
    //             },
    //         ]
    //     }
    // ];

    const GET_GAMES = gql`
        query getGames($userID: String!) {
            getGames(userID: $userID) {
                date
                course
                holes
                teeBox
                score
                handicapDifferential
            }
        }
    `;
    const { data: gameData, loading: gamesLoading, error: gamesError, refetch} = useQuery(GET_GAMES, {
        variables: { userID: auth.currentUser?.uid },
    });

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
                address {
                    city
                    country
                }
                scorecard {
                    holeNumber
                    par
                    teeLengths {
                        key
                        value
                    }
                    handicap
                }
            }
        }
    `;
    const { data: courseData, loading: coursesLoading, error: coursesError } = useQuery(GET_COURSES, {
        variables: { userID: auth.currentUser?.uid },
    });


    useEffect(() => {
        if (gameData) {
           setGames(gameData.getGames);
        }
        if (courseData) {
            setCourses(courseData.getCourses);
        }
    }, [gameData, courseData, gamesLoading]);

    async function closeDialog(addedScore: boolean) {
        setShowAddScoreDialog(false);
        // TODO: fix chart not updating after adding score
        if (addedScore) refetch();
    }

    function getTeeLength(game: Game): number {
        let course = courses.find((course) => course.name === game.course);
        if (course) {
            let teeBox = course.teeBoxes.find((teeBox) => teeBox.name === game.teeBox);
            if (teeBox) {
                return teeBox.length;
            }
        }
        return 0;
    }

    function getSlopeAndRating(game: Game): string {
        let course = courses.find((course) => course.name === game.course);
        if (course) {
            let teeBox = course.teeBoxes.find((teeBox) => teeBox.name === game.teeBox);
            if (teeBox) {
                return `${teeBox.courseRtg}/${teeBox.slope}`;
            }
        }
        return '';
    }

    function getPar(game: Game): number {
        let course = courses.find((course) => course.name === game.course);
        if (course) {
            return course.par;
        }
        return 0;
    }

    return (
        <div>
            <Button colorScheme="blue" onClick={() => setShowAddScoreDialog(true)}>Add Score</Button>
            {showAddScoreDialog ? <AddScoreDialog courses={courses} show={showAddScoreDialog} close={(addedScore) => closeDialog(addedScore)}/> : ''}
            <TableContainer verticalAlign="top" height="100%">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Course</Th>
                            <Th>Holes</Th>
                            <Th>Tees</Th>
                            <Th>Yds</Th>
                            <Th>Rating/Slope</Th>
                            <Th>Score</Th>
                            <Th>Par</Th>
                            <Th>Diff</Th>
                            <Th>Included in Handicap</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    { games && games.map((game: Game) => (
                            <Tr key={game.score + game.date}>
                                <Td>{new Date(game.date).toLocaleDateString()}</Td>
                                <Td>{game.course}</Td>
                                <Td>{game.holes}</Td>
                                <Td>{game.teeBox}</Td>
                                <Td>{getTeeLength(game)}</Td>
                                <Td>{getSlopeAndRating(game)}</Td>
                                <Td>{game.score}</Td>
                                <Td>{getPar(game)}</Td>
                                <Td>{parseFloat(game.handicapDifferential.toFixed(1))}</Td>
                                {/* TODO: calculate this based on handicap card */}
                                <Td>yes</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Scores;
