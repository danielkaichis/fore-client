import React from "react";
import { Icon, useBoolean, Tooltip, Center } from "@chakra-ui/react";
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
        <Link to={redirectTo}>
            <Tooltip hasArrow label={tooltip} bg='black' color='white' placement="right" borderRadius={5}>
                <Center onMouseEnter={setHovered.on} 
                    onMouseLeave={setHovered.off}
                    flexDir="column"
                    mt={8}
                    mb={4}
                    alignItems="center" 
                    color={active || hovered ? "white" : "#9f9f9f"}
                >
                    <Icon as={icon} fontSize="2xl"/>
                </Center>
            </Tooltip>
        </Link>
    );
};

export default NavItem;
