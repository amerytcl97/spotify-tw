import {
  HeartIcon,
  PlayCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { ReactElement } from "react";
import PlayButton from "../../components/Buttons/PlayButton";
import Layout from "../../components/Layout";
import LikedSongsTable from "../../components/Tables/LikedSongsTable";
import { authenticateSession } from "../../utils/login";
import { getUserSavedTracks } from "../api/spotify";

type UserLikedSongsProps = {
  userSavedTracks: SpotifyApi.UsersSavedTracksResponse;
};

export default function UserLikedSongs({
  userSavedTracks,
}: UserLikedSongsProps) {
  const { data: session } = useSession();
  console.log(userSavedTracks);
  return (
    <div className="h-full bg-gradient-to-b from-violet-800 via-black to-black">
      <div className="h-62 flex flex-row gap-6 bg-transparent px-4 pb-7 pt-14">
        <HeartIcon className="h-36 w-36 shadow-2xl" />
        <div className="flex flex-col gap-4 ">
          <span>PLAYLIST</span>
          <h1 className="whitespace-nowrap text-7xl font-bold">Liked Songs</h1>
          <span>{session?.user.name ?? "Username"} • 113 songs</span>
        </div>
      </div>
      <div className="px-4 backdrop-blur-md backdrop-brightness-50">
        <div className="py-10">
          <PlayButton className="flex h-14 w-14 items-center justify-center rounded-full bg-green-400 p-2 [&>svg]:fill-black [&>svg]:stroke-black" />
        </div>
        <LikedSongsTable data={userSavedTracks.items} />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);

  if (!authenticateSession(session)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = await getUserSavedTracks(session!);

  return {
    props: {
      userSavedTracks: data,
    },
  };
}

UserLikedSongs.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Liked Songs">{page}</Layout>;
};
