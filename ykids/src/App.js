import React, { useState } from "react";
import { DATA } from "./data";
import ScrollList from "./ScrollList";
import VideoPlayer from "./VideoPlayer";

import "./App.css";

const SETTINGS = {
  repeatMode: false,
  onlySound: false,
  taskMode: true,
};

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
