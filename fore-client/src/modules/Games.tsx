import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Course, Game } from "../types/fore";
import { gql, useQuery } from "@apollo/client";
import { getAuth } from "firebase/auth";
import AddScoreDialog from "../components/games/AddScoreDialog";
import { set } from "react-hook-form";

const Scores = (): React.ReactElement => {
    const auth = getAuth();
    const [ showAddScoreDialog, setShowAddScoreDialog ] = useState(false);
    const [ games, setGames ] = useState<Game[]>([]);
    const [ handicap, setHandicap ] = useState<number>(NaN);
    const [ courses, setCourses ] = useState<Course[]>([]); 

    const GET_GAMES = gql`
        query getGames($userID: String!) {
            getGames(userID: $userID) {
                games { 
                    date
                    course
                    holes
                    teeBox
                    score
                    handicapDifferential
                    includedInHandicap
                }
                handicap
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
        if (gameData && !gamesLoading) {
            // convert to array of Game
            const sortedGames = JSON.parse(JSON.stringify(gameData.getGames.games)).sort((a: Game, b: Game) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setGames(sortedGames);
            if (gameData.getGames.handicap && gameData.getGames.games.length >= 20 ) {
                setHandicap(gameData.getGames.handicap);
            }
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

    function getIncludedInHandicap(game: Game): boolean {

        const gamesCopy = JSON.parse(JSON.stringify(games));
        if (gamesCopy.splice(0, 20).sort((a: Game, b: Game) => a.handicapDifferential - b.handicapDifferential)
            .splice(0, 8).map((game: Game) => JSON.stringify(game)).includes(JSON.stringify(game))) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div>
            <Button colorScheme="blue" onClick={() => setShowAddScoreDialog(true)}>Add Score</Button>
            {showAddScoreDialog ? <AddScoreDialog courses={courses} show={showAddScoreDialog} close={(addedScore) => closeDialog(addedScore)}/> : ''}
            <p>Handicap: {handicap ? handicap?.toFixed(1): "You must play at least 20 rounds to calculate a handicap"}</p>
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
                                <Td>{game.date}</Td>
                                <Td>{game.course}</Td>
                                <Td>{game.holes}</Td>
                                <Td>{game.teeBox}</Td>
                                <Td>{getTeeLength(game)}</Td>
                                <Td>{getSlopeAndRating(game)}</Td>
                                <Td>{game.score}</Td>
                                <Td>{getPar(game)}</Td>
                                <Td>{parseFloat(game.handicapDifferential.toFixed(1))}</Td>
                                <Td>{handicap && getIncludedInHandicap(game) ? "✅" : "❌"}</Td>
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
