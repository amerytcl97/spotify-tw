import { Bars3BottomLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import {
  SidebarContext,
  SidebarContextProps,
} from "../../context/SidebarContextProvider";

export default function SidebarButton() {
  const { open, setOpen } = useContext(SidebarContext) as SidebarContextProps;

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="absolute block sm:block md:hidden lg:hidden"
    >
      {open ? (
        <Bars3BottomLeftIcon className="h-7 w-7 text-black" />
      ) : (
        <Bars3Icon className="h-7 w-7 text-white" />
      )}
    </button>
  );
}
