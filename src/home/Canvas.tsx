import { Box } from '@chakra-ui/react';
import React from 'react';

const Canvas = (props: { children: any; }): React.ReactElement => {
    const children = props;
    return (
        <Box className="canvas" pl={4} pr={1.5} width="calc(100% - 75px)">
            {children.children}
        </Box>
    );
}

export default Canvas;
