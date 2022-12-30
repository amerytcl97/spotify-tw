import { HeartIcon } from "@heroicons/react/24/outline";

type FavoriteButtonProps = {
  className?: string;
};

export default function FavoriteButton({ className }: FavoriteButtonProps) {
  return (
    <button type="button" className={className}>
      <span className="sr-only">Favorite tracks</span>
      <HeartIcon className="h-full w-full" />
    </button>
  );
}
