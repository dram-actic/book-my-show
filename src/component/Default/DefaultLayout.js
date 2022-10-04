import React from "react";
import Header from "../HeaderAndFooter/Header";
import Footer from "../HeaderAndFooter/Footer";
function DefaultLayout(props) {
    return (
        <>
            <Header search = {props.search}/>
            {props.children}
            <Footer />
        </>
    );
};
export default DefaultLayout;