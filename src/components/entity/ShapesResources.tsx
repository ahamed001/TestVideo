// ShapesResource.tsx
import React, { useState, useRef } from "react";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { StoreContext } from "@/store";

type ShapesResourceProps = {
  image: string;
  index: number;
};

export const ShapesResource = observer(({ image, index }: ShapesResourceProps) => {
  const store = React.useContext(StoreContext);
  const ref = useRef<HTMLImageElement>(null);
  const [resolution, setResolution] = useState({ w: 0, h: 0 });
  const activeObject = useActiveObject();
  const editor = useEditor();

  const handleFillChange = (color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color });
    }
  };

  return (
    <div className="rounded-lg overflow-hidden items-center bg-slate-800 m-[15px] flex flex-col relative">
      <button
        className="hover:bg-[#EA2127] bg-[rgba(0,0,0,.25)] rounded-full z-10 text-white font-bold p-1 absolute text-lg bottom-2 right-2"
        onClick={() => store.addImage(index)}
      >
        <MdAdd size="25" />
      </button>
      <img
        onLoad={() => {
          setResolution({
            w: ref.current?.naturalWidth ?? 0,
            h: ref.current?.naturalHeight ?? 0,
          });
        }}
        ref={ref}
        className=" w-28 h-28"
        src={image}
        height={200}
        width={200}
        id={`image-${index}`}
      />
    </div>
  );
});
