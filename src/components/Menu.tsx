"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import {
  MdTitle,
  MdOutlineAudioFile,
  MdPhotoFilter,
  MdAnimation,
  MdOutlineFormatColorFill,
  MdCloudUpload,
} from "react-icons/md";
import { TfiExport } from "react-icons/tfi";
import { RiFolderLine } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";

import { FaShapes } from "react-icons/fa6";
import { Store } from "@/store/Store";

export const Menu = observer(() => {
  const store = React.useContext(StoreContext);

  return (
    <ul className="bg-white h-full">
      {MENU_OPTIONS.map((option) => {
        const isSelected = store.selectedMenuOption === option.name;
        return (
          <li
            key={option.name}
            className={`h-[72px] w-[72px] flex flex-col items-center justify-center ${isSelected ? "bg-slate-200" : ""}`}
          >
            <button
              onClick={() => option.action(store)}
              className={`flex flex-col items-center`}
            >
              <option.icon
                size="20"
                color={
                  isSelected ? "#000" : "#444"
                }
              />
              <div
                className={`text-[0.6rem] hover:text-black ${isSelected ? "text-black" : "text-slate-600"}`}
              >
                {option.name}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
});

const MENU_OPTIONS = [
  {
    name: "Export",
    icon: TfiExport,
    action: (store: Store) => {
      store.setSelectedMenuOption("Export");
    },
  },
  {
    name: "Video",
    icon: RiFolderLine,
    action: (store: Store) => {
      store.setSelectedMenuOption("Video");
    },
  },
  {
    name: "Audio",
    icon: MdOutlineAudioFile,
    action: (store: Store) => {
      store.setSelectedMenuOption("Audio");
    },
  },
  {
    name: "Image",
    icon: LuImagePlus,
    action: (store: Store) => {
      store.setSelectedMenuOption("Image");
    },
  },
  {
    name: "Text",
    icon: MdTitle,
    action: (store: Store) => {
      store.setSelectedMenuOption("Text");
    },
  },
  {
    name: "Shapes",
    icon: FaShapes,
    action: (store: Store) => {
      store.setSelectedMenuOption("Shapes");
    },
  },
  {
    name: "Animation",
    icon: MdAnimation,
    action: (store: Store) => {
      store.setSelectedMenuOption("Animation");
    },
  },
  {
    name: "Effect",
    icon: MdPhotoFilter,
    action: (store: Store) => {
      store.setSelectedMenuOption("Effect");
    },
  },
  {
    name: "Fill",
    icon: MdOutlineFormatColorFill,
    action: (store: Store) => {
      store.setSelectedMenuOption("Fill");
    },
  },
  {
    name: "Import",
    icon: MdCloudUpload,
    action: (store: Store) => {
      store.setSelectedMenuOption("Upload");
    },
  },
];
