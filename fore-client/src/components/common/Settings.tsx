import React from "react";
import { Flex, Menu, MenuButton, Icon, useBoolean, Tooltip } from "@chakra-ui/react";
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
        <Tooltip hasArrow label={tooltip} bg='black' color='white' placement="right" borderRadius={4} h="3vh" my="auto">
            <Flex
                onMouseEnter={setHovered.on} 
                onMouseLeave={setHovered.off}
                flexDir="column"
                alignItems="center"
                mt={2}
            >
                <Menu placement="right">
                    <MenuButton w="100%" _hover={{ color: "black" }}>
                        <Flex color={active || hovered ? "white" : "#9f9f9f"}>
                            <span>
                                <Icon mt="0.9vh" as={icon} fontSize="xl"/>
                            </span>
                        </Flex>
                    </MenuButton>
                </Menu>
            </Flex>
        </Tooltip>
    );
};

export default Settings;
