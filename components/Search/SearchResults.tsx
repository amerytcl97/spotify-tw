import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { getUserSearches } from "../../pages/api/spotify";
import ArtistCard from "../Cards/ArtistCard";
import List from "../List";
import SectionHeading from "../SectionHeading";
import TrackCard from "../TrackCard";

type SearchResultsProps = {
  query: string;
};

const SEARCH_DELAY = 1500;

export default function SearchResults({ query }: SearchResultsProps) {
  const { data: session } = useSession();
  const timerRef = useRef<any>(null);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<{
    artists: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | undefined;
    tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined;
  }>();

  useEffect(() => {
    if (query) {
      setIsSearching(true);
      timerRef.current = setTimeout(async () => {
        const userSearchResults = await getUserSearches(session!, query);
        if (userSearchResults) {
          setSearchResults({
            artists: userSearchResults?.artists,
            tracks: userSearchResults?.tracks,
          });
          setIsSearching(false);
        }
      }, SEARCH_DELAY);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [query, session]);

  searchResults;
  if (isSearching) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <ArrowPathIcon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (
    typeof searchResults == "undefined" ||
    (!searchResults?.artists?.items.length &&
      !searchResults.tracks?.items.length)
  ) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <span className="text-3xl font-bold">No Results</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-2 px-2">
      <section className="col-span-3 ">
        <SectionHeading title="Artists" />
        <List
          className="mt-2 flex flex-row flex-wrap gap-3"
          items={searchResults?.artists?.items.map((artist) => (
            <li
              key={artist.id}
              className="h-48 w-[10rem] min-w-[10rem] max-w-[11rem] grow"
            >
              <ArtistCard images={artist.images} name={artist.name} />
            </li>
          ))}
        />
      </section>
      <section className="col-span-2">
        <SectionHeading title="Tracks" />
        <List
          items={searchResults?.tracks?.items.map((track) => (
            <li key={track.id}>
              <TrackCard
                images={track.album.images}
                name={track.name}
                artistName={track.artists[0].name}
                duration={track.duration_ms}
              />
            </li>
          ))}
        />
      </section>
    </div>
  );
}
