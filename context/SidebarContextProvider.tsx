import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type SidebarContextProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

type useSideBarContextProps = {
  children: ReactNode | ReactElement;
};

export const SidebarContext = createContext<SidebarContextProps | null>(null);

const SidebarContextProvider = ({ children }: useSideBarContextProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        setOpen,
        open,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
