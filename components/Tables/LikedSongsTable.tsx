import { ClockIcon, HeartIcon } from "@heroicons/react/24/outline";
import { convertMsToMinSec } from "../../utils/functions";
import { formatDistance, subDays } from "date-fns";
import FavoriteButton from "../Buttons/FavoriteButton";

type LikedSongsTableProps = {
  data: SpotifyApi.UsersSavedTracksResponse["items"];
};

export default function LikedSongsTable({
  data: likedSongs,
}: LikedSongsTableProps) {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="w-8 pb-4 text-left text-sm font-light text-gray-300">
              #
            </th>
            <th className="pb-4 text-left text-sm font-light text-gray-300">
              TITLE
            </th>
            <th className="pb-4 text-left text-sm font-light text-gray-300">
              ALBUM
            </th>
            <th className="hidden pb-4 text-left text-sm font-light text-gray-300 lg:block">
              DATE ADDED
            </th>
            <th className="pb-4 text-gray-300">
              <ClockIcon className="float-right block h-5 w-5" />
            </th>
          </tr>
        </thead>
        <tbody className="border-spacing-3">
          {likedSongs.map(
            (
              { track: { id, name, album, artists, duration_ms }, added_at },
              index
            ) => (
              <tr key={id} className="h-16 w-full">
                <td className="font-mono text-sm text-gray-300">{index + 1}</td>
                <td className="pr-4">
                  <div className="max-w-xs">
                    <p className="truncate text-ellipsis text-base">{name}</p>
                    <span className="text-xs text-gray-300">
                      {artists[0].name}
                    </span>
                  </div>
                </td>
                <td className="min-w-0 max-w-xs pr-4 text-sm text-gray-300">
                  <p className="truncate">{album.name}</p>
                </td>
                <td className="hidden text-sm text-gray-300 lg:block">
                  {formatDistance(subDays(new Date(added_at), 0), new Date(), {
                    addSuffix: true,
                  })}
                </td>
                <td className="">
                  <div className="col-span-1 flex flex-row items-center justify-end gap-6 text-right text-sm font-light text-gray-300">
                    <FavoriteButton className="h-6 w-6" />
                    {convertMsToMinSec(duration_ms)}
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
