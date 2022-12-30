import { generateRandomHexColors } from "../../utils/functions";
import GenreCard from "../Cards/GenreCard";

type GenreListProps = {
  genres: SpotifyApi.AvailableGenreSeedsResponse["genres"];
};

export default function GenreList({ genres }: GenreListProps) {
  return (
    <section>
      <ul className="flex flex-row flex-wrap gap-2">
        {genres.length ? (
          genres.map((genre) => (
            <li key={genre} className="h-32 w-[10rem] min-w-[10rem] grow">
              <GenreCard name={genre} color={generateRandomHexColors()} />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
}
