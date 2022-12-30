import { PageRoute } from "../../types/general";
import {
  BookmarkIcon,
  ChartBarIcon,
  FolderPlusIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import {
  SidebarContext,
  SidebarContextProps,
} from "../../context/SidebarContextProvider";
import Link from "next/link";
import SidebarButton from "./SidebarButton";
import UserPlaylist from "../UserPlaylist/UserPlaylist";

const PAGE_ROUTES: PageRoute[] = [
  {
    icon: <HomeIcon className="h-6 w-6" />,
    name: "Home",
    url: "/",
  },
  {
    icon: <MagnifyingGlassIcon className="h-6 w-6" />,
    name: "Search",
    url: "/search",
  },
  {
    icon: <ChartBarIcon className="h-6 w-6" />,
    name: "Your Library",
    url: "/collection/playlists",
  },
  {
    icon: <FolderPlusIcon className="h-6 w-6" />,
    name: "Create Playlist",
    url: "",
  },
  {
    icon: <HeartIcon className="h-6 w-6" />,
    name: "Liked Songs",
    url: "/collection/tracks",
  },
  {
    icon: <BookmarkIcon className="h-6 w-6" />,
    name: "Your Episodes",
    url: "/collection/episodes",
  },
];
export default function Sidebar() {
  const { open } = useContext(SidebarContext) as SidebarContextProps;

  return (
    <>
      <SidebarButton />
      <aside
        className={`min-w-[12rem] flex-col bg-black py-7 px-3 text-white ${
          open ? "flex" : "hidden sm:hidden md:flex lg:flex"
        }`}
      >
        <header>Header</header>
        <div className="flex flex-1 flex-col gap-7 divide-y-2 py-10">
          <nav>
            <ul className="space-y-4">
              {PAGE_ROUTES.map(({ name, icon, url }, index) => (
                <li key={name} className="">
                  <Link
                    href={url}
                    className="flex flex-row flex-nowrap gap-4 text-sm font-semibold text-slate-300 hover:text-slate-50"
                  >
                    {icon}
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <UserPlaylist />
        </div>
        <footer>Footer</footer>
      </aside>
    </>
  );
}
