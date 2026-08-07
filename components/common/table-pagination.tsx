import { PaginationMeta } from "@/types/api";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface TablePaginationProps {
  meta: PaginationMeta;
  currentPage: Number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  currentPage,
  meta,
  onPageChange,
}: TablePaginationProps) {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > meta.totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="absolute bottom-0 py-2 rounded-lg sticky bg-white flex justify-between items-center px-5">
      <div className="w-1/2">
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          {`Page ${currentPage} of ${meta.totalPages}`}
        </div>
      </div>
      <div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => handlePageChange(Number(currentPage) - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => handlePageChange(Number(currentPage) + 1)}
            disabled={currentPage === meta.totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>

          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => handlePageChange(meta.totalPages)}
            disabled={currentPage === meta.totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
