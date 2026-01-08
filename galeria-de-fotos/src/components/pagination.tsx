interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

export function Pagination({page, setPage}: PaginationProps) {

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPrevioustPage = () => {
    setPage(page - 1);
  };
  
  return (
    <div className="flex pb-2 flex-row items-center justify-center">
      {page > 1 && (
        <button className="pr-2 text-sm" onClick={goToPrevioustPage}>
          Voltar
        </button>
      )}

      <p className="font-medium">Página {page}</p>
      <button className="pl-2 text-sm" onClick={goToNextPage}>
        Avançar
      </button>
    </div>
  );
}
