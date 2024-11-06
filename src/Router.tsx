import {createBrowserRouter} from "react-router-dom";
import Home from "./Pages/Home";
import Tv from "./Pages/Tv";
import Search from "./Pages/Search";
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
    {
        path: "movies/:id",
        element: (
            <>
                <Header />
                <Home />
            </>
        ),
    },
])

export default router;