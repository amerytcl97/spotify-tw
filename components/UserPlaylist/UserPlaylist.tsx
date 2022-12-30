import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserPlaylist } from "../../pages/api/spotify";

export default function UserPlaylist() {
  const { data: session } = useSession();

  const [userPlaylist, setUserPlaylist] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();

  useEffect(() => {
    (async () => {
      if (session) {
        const data = await getUserPlaylist(session!);
        if (data) {
          setUserPlaylist(data);
        }
      }
    })();
  }, [session]);

  return (
    <div className="py-4">
      {userPlaylist ? (
        <ul className="flex flex-col gap-3">
          {userPlaylist?.items.map((playList) => (
            <li
              key={playList.id}
              className="text-sm font-medium text-slate-300 hover:text-slate-50"
            >
              {playList.name}
            </li>
          ))}
        </ul>
      ) : (
        <div>No playlist found</div>
      )}
    </div>
  );
}
