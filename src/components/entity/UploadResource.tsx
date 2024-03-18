import React from 'react';
import { MdAdd } from 'react-icons/md';
import { observer } from 'mobx-react';
import { StoreContext } from "@/store";
import { formatTimeToMinSec } from '@/utils';

type UploadResourceProps = {
  resource: string;
  index: number;
  type: 'image' | 'video'; // Add a type property to distinguish between image and video
};

export const UploadResource = observer(
  ({ resource, index, type }: UploadResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLImageElement | HTMLVideoElement>(null);
    const [resolution, setResolution] = React.useState({ w: 0, h: 0 });
    const [formattedLength, setFormattedLength] = React.useState("00:00");

    React.useEffect(() => {
      if (type === 'video') {
        const videoElement = ref.current as HTMLVideoElement;
        videoElement.addEventListener('loadeddata', handleVideoLoadedData);
        return () => {
          videoElement.removeEventListener('loadeddata', handleVideoLoadedData);
        };
      } else {
        const imageElement = ref.current as HTMLImageElement;
        imageElement.addEventListener('load', handleImageLoad);
        return () => {
          imageElement.removeEventListener('load', handleImageLoad);
        };
      }
    }, [type]);

    const handleImageLoad = () => {
    };

    const handleVideoLoadedData = () => {
      const videoElement = ref.current as HTMLVideoElement;
      const videoLength = videoElement.duration ?? 0;
      setFormattedLength(formatTimeToMinSec(videoLength));
    };

    const addResource = () => {
      if (type === 'video') {
        store.addVideo(index);
      } else {
        store.addImage(index);
      }
    };

    return (
      <div className="rounded-lg overflow-hidden items-center bg-slate-800 m-[15px] flex flex-col relative">
        <div className="bg-[rgba(0,0,0,.25)] text-white py-1 absolute text-base top-2 right-2">
          {type === 'video' ? formattedLength : `${resolution.w}x${resolution.h}`}
        </div>
        <button
          className="hover:bg-[#EA2127] bg-[rgba(0,0,0,.25)] rounded-full z-10 text-white font-bold p-1 absolute text-lg bottom-2 right-2"
          onClick={addResource}
        >
          <MdAdd size="25" />
        </button>
        {type === 'video' ? (
          <video
            ref={ref as React.RefObject<HTMLVideoElement>}
            className="max-h-[100px] max-w-[150px]"
            src={resource}
            height={200}
            width={200}
            id={`video-${index}`}
          ></video>
        ) : (
          <img
            ref={ref as React.RefObject<HTMLImageElement>}
            className="max-h-[100px] max-w-[150px]"
            src={resource}
            height={200}
            width={200}
            id={`image-${index}`}
          ></img>
        )}
      </div>
    );
  }
);