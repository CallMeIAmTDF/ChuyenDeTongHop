import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export function FooterPagination({
  path,
  page,
  pageSize,
  pageTotal,
  isLoading,
  setPageSize
}: {
  path: string,
  page: number,
  pageSize: number,
  pageTotal: number,
  isLoading: boolean,
  setPageSize: (value: number) => void
}) {

  return (
    <div className="space-x-2 flex items-center text-sm gap-8">
      <div className="flex items-center gap-2">
        <span className="text-slate-800">Rows per page</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-fit gap-2">
            {isLoading ? (
              <Skeleton className=" h-6 w-8 rounded-md" />
            ) : (
              <SelectValue placeholder={pageSize} />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <Skeleton className="h-[30px] w-[100px] rounded-md" />
      ) : (
        <div>
          Page {page} of {pageTotal}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" disabled={page < 2}>
          <Link href={`${path}`} className="py-2 px-3">
            <ChevronsLeft />
          </Link>
        </Button>
        <Button variant="outline" size="icon" disabled={page < 2}>
          <Link href={`${path}?page=${page - 1}`} className="py-2 px-3">
            <ChevronLeft />
          </Link>
        </Button>
        <Button variant="outline" size="icon" disabled={page >= pageTotal}>
          <Link href={`${path}?page=${page + 1}`} className="py-2 px-3">
            <ChevronRight />
          </Link>
        </Button>
        <Button variant="outline" size="icon" disabled={page >= pageTotal}>
          <Link href={`${path}?page=${pageTotal}`} className="py-2 px-3">
            <ChevronsRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
