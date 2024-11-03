import {createBrowserRouter} from "react-router-dom";
import Home from "./Router/Home";
import Tv from "./Router/Tv";
import Search from "./Router/Search";
import Header from "./Components/Header";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/tv",
        element: (
            <>
                <Header />
                <Tv />
            </>
        )
    },
    {
        path: "/search",
        element:  (
            <>
                <Header />
                <Search />
            </>
        )
    },
    {
        path: "/",
        element: (
            <>
                <Header />
                <Home />
            </>
        ),
    },
])

export default router;