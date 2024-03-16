"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Resources } from "./Resources";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";
import { Store } from "@/store/Store";
import "@/utils/fabric-utils";

export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor></Editor>
    </StoreContext.Provider>
  );
}

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 1000,
      backgroundColor: "#ededed",
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#00a0f5";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#0063d8";
    fabric.Object.prototype.cornerSize = 10;
    // canvas mouse down without target should deselect active object
    canvas.on("mouse:down", function (e) {
      if (!e.target) {
        store.setSelectedElement(null);
      }
    });

    store.setCanvas(canvas);
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }, []);
  return (
    <div className="grid grid-rows-[600px_1fr_20px] grid-cols-[72px_300px_1fr_250px] h-[100vh]">
      <div className="tile row-span-3 flex flex-col w-[72px] h-full">
        <Menu />
      </div>
      <div className="row-start-1 col-start-2 row-span-2 flex flex-col overflow-auto w-80 px-3 hide-scrollbar">
        <Resources />
      </div>
      <div id="grid-canvas-container" className="col-start-3 row-start-1 ml-4 flex justify-center items-center">
        <canvas id="canvas" />
      </div>
      <div className="col-start-4 row-start-1 hide-scrollbar">
        <ElementsPanel />
      </div>
      <div className="col-start-2 row-start-2 col-span-3 relative px-[10px] py-[4px] ml-2 overflow-scroll hide-scrollbar">
        <TimeLine />
      </div>
    </div>
  );
});
