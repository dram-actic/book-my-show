import React from 'react';
import axios from 'axios';

import { Routes, Route } from "react-router-dom";
import DefaultHOC from './component/Default/DefaultHOC';
import HomePage from "./component/Pages/HomePage";
import BookingPage from "./component/Pages/BookingPage";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {};
axios.defaults.params["api_key"] = "274223da1674851001294a4c0b87a5d0";
function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<DefaultHOC element={HomePage} search={true}/>} />
                <Route exact path="/bookingpage/:id" element={<DefaultHOC element={BookingPage} search={false}/>} />
            </Routes>
        </>

    );
}
export default App;