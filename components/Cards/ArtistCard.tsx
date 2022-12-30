import Image from "next/image";
import { useEffect } from "react";

type ArtistCardProps = {
  images: SpotifyApi.ImageObject[];
  name: string;
};

export default function ArtistCard({ images, name }: ArtistCardProps) {
  return (
    <div className="flex h-full w-full flex-col gap-1 rounded-md bg-stone-900 p-1 hover:cursor-pointer">
      <figure className="relative h-full w-full">
        <Image
          src={images[0].url}
          alt={name}
          fill
          className="rounded-md object-cover"
        />
      </figure>
      <h4 className="text-base font-semibold">{name}</h4>
    </div>
  );
}
