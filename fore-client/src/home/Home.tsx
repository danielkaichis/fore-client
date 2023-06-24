import React from "react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/common/Sidebar";
import MainPanel from "../MainPage/MainPanel";
import AuthRoute from "../components/common/AuthRoute";

const Home = (): React.ReactElement => {
    return (
        <Flex backgroundColor="#fafbfc">
            <Sidebar />
            <AuthRoute>
                <MainPanel />
            </AuthRoute>
        </Flex>
    );
};

export default Home;