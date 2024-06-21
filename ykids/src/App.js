import React, { useState } from "react";
import { DATA } from "./data";
import ScrollList from "./ScrollList";
import VideoPlayer from "./VideoPlayer";

import "./App.css";

const SETTINGS = {
  repeatMode: false,
  onlySound: false,
  taskMode: false,
};

const BackArrow = () => (
  <svg
    fill="#fff"
    width="50px"
    height="50px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g data-name="Layer 2">
      <g data-name="arrow-back">
        <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" />

        <path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z" />
      </g>
    </g>
  </svg>
);

const Page = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(-1);
  const [hoverVideoIndex, sethoverVideoIndex] = useState(0);
  const [settings, setSettings] = useState(SETTINGS);
  console.log("settings: ", settings);

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <div
        onClick={() => {
          setActiveVideoIndex(-1);
        }}
        className="backButton"
      >
        <BackArrow />
      </div>

      <div
        style={{
          height: "100%",
          display: activeVideoIndex === -1 ? "block" : "none",
        }}
      >
        <List
          setActiveVideoIndex={setActiveVideoIndex}
          activeVideoIndex={activeVideoIndex}
          hoverVideoIndex={hoverVideoIndex}
          sethoverVideoIndex={sethoverVideoIndex}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
      <div
        style={{
          display: activeVideoIndex !== -1 ? "block" : "none",
        }}
      >
        <VideoPlayer
          defaultVideoIndex={activeVideoIndex}
          defaultHoverIndex={activeVideoIndex}
          setActiveVideoIndex={setActiveVideoIndex}
          settings={settings}
        />
      </div>
    </div>
  );
};

const List = ({
  sethoverVideoIndex,
  setActiveVideoIndex,
  hoverVideoIndex,
  activeVideoIndex,
  settings,
  setSettings,
}) => {
  console.log("settings list: ", settings);
  return (
    <ScrollList
      settings={settings}
      setSettings={setSettings}
      items={DATA}
      hoverIndex={hoverVideoIndex}
      activeVideoIndex={activeVideoIndex}
      onHover={(index) => {
        sethoverVideoIndex(index);
      }}
      onActive={(index) => {
        setActiveVideoIndex(index);
      }}
    />
  );
};

export default Page;
