import Image from "next/image";
import { convertMsToMinSec } from "../utils/functions";

type TrackCardProps = {
  images: SpotifyApi.ImageObject[];
  name: string;
  artistName: string;
  duration: number;
};

export default function TrackCard({
  images,
  name,
  artistName,
  duration,
}: TrackCardProps) {
  return (
    <div className="flex flex-row flex-nowrap items-center gap-2 rounded-md px-1 py-2 hover:cursor-pointer hover:bg-stone-900">
      <figure className="relative">
        <Image
          src={images[2].url}
          alt={name}
          width={images[2].height}
          height={images[2].height}
          className="rounded-md"
        />
      </figure>
      <div className="flex flex-1 flex-col leading-7">
        <h4 className="overflow-hidden text-ellipsis">{name}</h4>
        <span className="text-sm text-slate-400">{artistName}</span>
      </div>
      <span className="text-xs font-light">{convertMsToMinSec(duration)}</span>
    </div>
  );
}
