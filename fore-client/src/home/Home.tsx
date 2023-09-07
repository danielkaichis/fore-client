import React from "react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/common/Sidebar";
import AuthRoute from "../components/common/AuthRoute";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Dashboard from "../modules/Dashboard";
import Equipment from "../modules/Equipment";
import Scores from "../modules/Scores";
import Courses from "../modules/Courses";
import Leaderboard from "../modules/Leaderboard";

const Home = (): React.ReactElement => {
    return (
        <Flex backgroundColor="#fafbfc">
                <BrowserRouter>
                    <Sidebar />
                    <AuthRoute>
                        <Routes>
                            <Route path="/" element={<Dashboard />}/>
                            <Route path="/equipment" element={<Equipment />} />
                            <Route path="/scores" element={<Scores />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                        </Routes>
                    </AuthRoute>
                </BrowserRouter>
        </Flex>
    );
};

export default Home;