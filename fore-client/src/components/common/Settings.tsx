import React from "react";
import { Center, Icon, useBoolean, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons";

type SettingProps = {
    icon: IconType,
    tooltip: string
    active: boolean
}

const Settings = ({
    icon,
    tooltip,
    active
}: SettingProps): React.ReactElement => {
    const [hovered, setHovered] = useBoolean(false);

    return(
        <Tooltip hasArrow label={tooltip} bg='black' color='white' placement="right" borderRadius={5}>
            <Center
                onMouseEnter={setHovered.on} 
                onMouseLeave={setHovered.off}
                py={5}
                color={active || hovered ? "white" : "#9f9f9f"} 
                cursor="pointer"
            >
                <Icon as={icon} fontSize="2xl"/>
            </Center>
        </Tooltip>
    );
};

export default Settings;
