import React from "react";
import logo from '../assets/logo.png'
export default function Logo({ width = "100px" }) {
    return (
        <div className="flex ">
            <img src={logo} alt="" className="w-14" />
            <p className="content-center font-bold">TravelBlog</p>
        </div>
    );
}
