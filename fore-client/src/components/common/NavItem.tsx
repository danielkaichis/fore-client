import React from "react";
import { Flex, Menu, MenuButton, Icon, useBoolean, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type NavItemProps = {
    icon: IconType
    tooltip: string
    active: boolean
    redirectTo: string
}

const NavItem = ({
    icon,
    tooltip,
    active,
    redirectTo,
}: NavItemProps): React.ReactElement => {
    const [hovered, setHovered] = useBoolean(false);

    return(
        <Tooltip hasArrow label={tooltip} bg='black' color='white' placement="right" borderRadius={4} h="3vh" my="auto">
            <Flex
                onMouseEnter={setHovered.on} 
                onMouseLeave={setHovered.off}
                mt={30}
                flexDir="column"
                alignItems="center"
            >
                <Menu placement="right">
                    <Link to={redirectTo}>
                        <MenuButton py="5%" w="100%">
                            <Flex color={active || hovered ? "white" : "#9f9f9f"}>
                                <span>
                                        <Icon mt="0.9vh" as={icon} fontSize="xl"/>
                                </span>
                            </Flex>
                        </MenuButton>
                    </Link>
                </Menu>
            </Flex>
        </Tooltip>
    );
};

export default NavItem;
