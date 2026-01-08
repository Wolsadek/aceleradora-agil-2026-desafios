import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export function SearchBar({ query, setQuery }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = () => {
    setQuery(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setQuery(e.target.value); 
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center pt-1 pb-6">
      <input
        className="border-2 rounded-md px-2 py-1"
        type="text"
        name="query"
        placeholder="Digite algo"
        value={inputValue} 
        onChange={handleInputChange} 
      />
      <button
        className="flex justify-center items-center gap-2 bg-slate-900 rounded-lg text-white w-32 py-1"
        onClick={handleSearch} 
      >
        <MagnifyingGlass weight="bold" />
        <p>Buscar</p>
      </button>
    </div>
  );
}
