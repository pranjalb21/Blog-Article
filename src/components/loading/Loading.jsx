import React from "react";

export default function Loading() {
    return (
        <div className="h-screen w-full bg-gray-200 bg-opacity-50 flex justify-center items-center fixed">
            <div className="w-20 h-20 bg-transparent rounded-full border-8 border-x-red-400 animate-spin"></div>
        </div>
    );
}
