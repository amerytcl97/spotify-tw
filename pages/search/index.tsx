import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import GenreList from "../../components/Search/GenreList";
import SearchInput from "../../components/Search/SearchInput";
import SearchResults from "../../components/Search/SearchResults";
import { authenticateSession } from "../../utils/login";
import { getAvailableGenres } from "../api/spotify";

type SearchProps = {
  genres: SpotifyApi.AvailableGenreSeedsResponse["genres"];
};

export default function Search({ genres }: SearchProps) {
  const [query, setQuery] = useState<string>("");

  return (
    <div>
      <SearchInput getInputValue={setQuery} />
      <div className="py-4">
        {query ? (
          <SearchResults query={query} />
        ) : (
          <GenreList genres={genres} />
        )}
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

  const { genres } = (await getAvailableGenres(session!)) ?? {};

  return {
    props: {
      genres,
    },
  };
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Liked Songs">{page}</Layout>;
};
