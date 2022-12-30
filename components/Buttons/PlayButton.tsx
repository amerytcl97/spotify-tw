import { PlayIcon } from "@heroicons/react/24/outline";

type PlayButtonProps = {
  className?: string;
};

export default function PlayButton({ className }: PlayButtonProps) {
  return (
    <button type="button" className={className}>
      <PlayIcon className="h-full w-full" />
    </button>
  );
}
