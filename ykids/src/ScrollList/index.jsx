import React from "react";

const ScrollList = ({
  items,
  onHover,
  onActive,
  hoverIndex,
  activeVideoIndex,
  settings,
  setSettings,
}) => {
  console.log("settings: ", settings);

  return (
    <div className="grid">
      {items.map((item, index) => {
        let className = "preview";

        if (index === activeVideoIndex) {
          className += " selected";
        } else if (index === hoverIndex) {
          className += " active";
        }
        return (
          <>
            <div className={"preview empty"} key={"preview" + index}>
              {index === 1 && (
                <>
                  <div key="repeat">
                    <label>
                      повтор
                      <input
                        type="checkbox"
                        checked={settings.repeatMode}
                        onClick={() => {
                          setSettings({
                            ...settings,
                            repeatMode: !settings.repeatMode,
                          });
                        }}
                      ></input>
                    </label>
                  </div>
                  <div key="sound">
                    <label>
                      только звук
                      <input
                        type="checkbox"
                        checked={settings.onlySound}
                        onClick={() => {
                          setSettings({
                            ...settings,
                            onlySound: !settings.onlySound,
                          });
                        }}
                      ></input>
                    </label>
                  </div>
                </>
              )}
            </div>
            <img
              key={"image" + index}
              src={
                item.img ||
                `https://img.youtube.com/vi/${item.url.split("=")[1]}/0.jpg`
              }
              className={className}
              onClick={() => {
                onHover(index);
                if (index === hoverIndex) {
                  onActive(index);
                }
              }}
            />
          </>
        );
      })}
    </div>
  );
};

export default ScrollList;
