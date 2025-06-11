import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-[350px] bg-white">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute inset-2 border-4 border-gray-300 rounded-full animate-bounce border-t-transparent"></div>
            </div>
        </div>
    );
};

export default Loader;
