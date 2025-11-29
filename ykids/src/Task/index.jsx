import React, { useState, useEffect } from "react";

const Task = ({ setPlaying, onRightAnswer }) => {
  useEffect(() => {
    setPlaying(false);
  });

  return (
    <div className="taskWrap">
      <div
        onClick={() => {
          onRightAnswer();
        }}
      >
        <img src="/player/images/маша и дед мороз.png" class="preview"></img>
        answer
      </div>
    </div>
  );
};

export default Task;
