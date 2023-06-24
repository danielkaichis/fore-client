import { Box, Button, Circle, Flex, Spacer, Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Timer = (): React.ReactElement => {
    const [ minutes, setMinutes ] = useState(0);
    const [ seconds, setSeconds ] = useState(20);
    const [ isPaused, setIsPaused ] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                if(seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [ minutes, seconds, isPaused ]);

    const handlePause = (): void => {
        setIsPaused(true);
        // grey out button
    }

    const handlePlay = (): void => {
        setIsPaused(false);
        // grey out button
    }

    return (
        // TODO: add reset functionality per sketch
        <Box mt="40px">
            <Circle fontSize="2xl" fontWeight="bold">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Circle>
            <Flex height="auto" justifyContent="center">
                <Flex px={2}>
                    <Button colorScheme="green" onClick={handlePlay}>Start</Button>
                </Flex>
                <Flex px={2}>
                    <Button colorScheme="red" onClick={handlePause}>Stop</Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Timer;