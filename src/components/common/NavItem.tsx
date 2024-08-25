import React, { useEffect, useState } from "react";
import { Icon, Tooltip, Center } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

type NavItemProps = {
    icon: IconType
    tooltip: string
    redirectTo: string
}

const NavItem = ({
    icon,
    tooltip,
    redirectTo,
}: NavItemProps): React.ReactElement => {
    const location = useLocation();
    const [ active, setActive ] = useState(location.pathname === redirectTo);

    useEffect(() => {
        setActive(location.pathname === redirectTo);
    }, [location.pathname, redirectTo]);

    return(
        <Center mt={8} mb={4}>
            <Link to={redirectTo}>
                <Tooltip hasArrow label={tooltip} bg='black' color='white' placement="right" borderRadius={5}>
                    <Center>
                        <Icon color={active ? "white": "#9f9f9f"}
                            _hover={{color: "white"}} 
                            as={icon} 
                            fontSize="2xl"
                        />
                    </Center>
                </Tooltip>
            </Link>
        </Center>
    );
};

export default NavItem;
