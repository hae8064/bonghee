"use client";

import React from "react";
import Main from "./Main";
import AboutMe from "./AboutMe";

const Home = () => {
  return (
    <div className="flex flex-col w-screen h-screen relative">
      <div className="fixed top-0 w-full h-full">
        <Main />
      </div>
      <div
        className={`absolute top-full w-full h-full transition-all duration-1000 ease-out`}
      >
        <AboutMe />
      </div>
    </div>
  );
};

export default Home;
