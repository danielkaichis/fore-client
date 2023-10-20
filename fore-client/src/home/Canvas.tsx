import { Box, Center } from '@chakra-ui/react';
import React from 'react';

const Canvas = (props: { children: any; }): React.ReactElement => {
    const children = props;
    return (
        <Box className="canvas" width="100%" pl={4} pr={1.5}>
            {children.children}
        </Box>
    );
}

export default Canvas;