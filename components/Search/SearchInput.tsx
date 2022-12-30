import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

type SearchInputProps = {
  getInputValue: (value: string) => void;
};

export default function SearchInput({ getInputValue }: SearchInputProps) {
  const handleFormSubmit = (ev: any) => {
    ev.preventDefault();
  };

  useEffect(() => {
    // const handleKeyPress = (ev: any) => {
    //   console.log(ev);
    // };
    // document.addEventListener("keypress", handleKeyPress);
    // return () => {
    //   document.removeEventListener("keypress", handleKeyPress);
    // };
    // const handleInputListener = (ev: any) => {
    //     if (ev.key === "/") {
    //       inputRef ? inputRef.current?.focus() : null;
    //     }
    //   };
  }, []);

  return (
    <form
      role="search"
      onSubmit={handleFormSubmit}
      onReset={() => getInputValue("")}
      className="inline-flex w-full flex-nowrap items-center border-b border-b-transparent bg-stone-900 px-2 py-5 transition-all duration-300 focus-within:border-b-white"
    >
      <MagnifyingGlassIcon className="mr-3 h-7 w-7" />
      <input
        type="text"
        placeholder="Search for your favourite music"
        onChange={(ev) => getInputValue(ev.target.value)}
        className="peer m-0 h-full w-full bg-transparent text-2xl font-semibold outline-none"
      />
      <button type="reset" className="block peer-placeholder-shown:hidden">
        <XMarkIcon className="h-7 w-7" />
      </button>
    </form>
  );
}
