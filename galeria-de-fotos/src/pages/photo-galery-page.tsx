import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { PhotoGallery } from "../components/photo-gallery";
import { SearchBar } from "../components/search-bar";
import { Pagination } from "../components/pagination";

export function PhotoGalleryPage() {
  const [query, setQuery] = useState("beautiful nature");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div>
      <Header />
      <SearchBar query={query} setQuery={setQuery}  />
      <Pagination page={page} setPage={setPage} />
      <PhotoGallery query={query} page={page} />
    </div>
  );
}
