type SectionHeadingProps = {
  title: string;
};

export default function SectionHeading({ title }: SectionHeadingProps) {
  return <h2 className="text-xl font-semibold">{title}</h2>;
}
