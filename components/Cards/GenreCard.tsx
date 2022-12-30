type GenreCardProps = {
  name: string;
  color?: string;
};

export default function GenreCard({ name, color }: GenreCardProps) {
  return (
    <div
      role="presentation"
      style={{
        backgroundColor: color,
      }}
      className={`flex h-full w-full items-center justify-center rounded-md transition-transform hover:-translate-y-1 hover:cursor-pointer`}
    >
      <h4 className="text-lg font-semibold capitalize">{name}</h4>
    </div>
  );
}
