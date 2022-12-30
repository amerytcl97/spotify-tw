import { ReactElement, ReactNode } from "react";

type ListProps = {
  heading?: string;
  items: ReactNode | ReactElement;
  className?: string;
};

export default function List({ heading, items, className }: ListProps) {
  return (
    <>
      {heading ? <h3>{heading}</h3> : null}
      <ul className={className}>{items}</ul>
    </>
  );
}
