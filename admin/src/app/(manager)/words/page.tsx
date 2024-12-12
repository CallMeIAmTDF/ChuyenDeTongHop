"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { FooterPagination } from "@/app/(manager)/components/footer-pagination";
import { useDebounce } from "@/hooks/use-debound";
import { WordResponse } from "@/types/word";
import { useGetAllTopicQuery } from "@/queries/useTopic";
import { useGetAllWordQuery } from "@/queries/useWord";
import { TopicResponse } from "@/types/topic";
import CreateForm from "@/app/(manager)/words/create-form";
import EditForm from "@/app/(manager)/words/edit-form";
import { AlertDelete } from "@/app/(manager)/words/alert-delete";

export const columns: ColumnDef<WordResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            className=""
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "word",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Word
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: "text",
    cell: ({ row }) => <div className="capitalize">{row.getValue("word")}</div>,
  },
  {
    accessorKey: "topicName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Topic
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("topicName")}</div>
    ),
  },
  {
    accessorKey: "meaning",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            className=""
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Meaning
            <ArrowUpDown />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="text-center">{row.getValue("meaning")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { setWordIdEdit, setWordDelete } = useContext(TableContext);
      const [openDropdown, setOpenDropdown] = useState<boolean>(false);

      const openDetail = () => {
        setWordIdEdit(row.original.id);
        setOpenDropdown(false);
      };

      const openAlertDelete = () => {
        setWordDelete(row.original);
        setOpenDropdown(false);
      };

      return (
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openDetail}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={openAlertDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const TableContext = React.createContext<{
  wordIdEdit: number | undefined;
  setWordIdEdit: (value: number) => void;
  wordDelete: WordResponse | undefined;
  setWordDelete: (value: WordResponse | undefined) => void;
}>({
  wordIdEdit: undefined,
  setWordIdEdit: (value: number | undefined) => {},
  wordDelete: undefined,
  setWordDelete: (value: WordResponse | undefined) => {},
});

export default function TopicPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [wordIdEdit, setWordIdEdit] = useState<number | undefined>();
  const [wordDelete, setWordDelete] = useState<WordResponse | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [topicSelect, setTopicSelect] = useState<string>("");
  const debounce = useDebounce(searchValue);

  const pageAble: IModelPaginateRequest = {
    page: page - 1,
    size: pageSize,
    sort: [],
  };

  const { data, isLoading } = useGetAllWordQuery(
    { filter: "word ~ '" + debounce + "'" },
    pageAble,
    Number(topicSelect)
  );
  const words: WordResponse[] = data?.payload.data?.result ?? [];
  const pageTotal = data?.payload.data?.meta.pages ?? 1;

  const queryTopics = useGetAllTopicQuery(
    { filter: "" },
    { page: 0, size: 0, sort: [] }
  );
  const topics: TopicResponse[] = queryTopics.data?.payload.data?.result ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  useEffect(() => {
    // reset pageIndex when pageSize changes and blank
    if (page < 0 || page > pageTotal) router.push("/words");
  }, [pageTotal]);

  const table = useReactTable({
    data: words,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <TableContext.Provider
      value={{
        wordIdEdit,
        setWordIdEdit,
        wordDelete,
        setWordDelete,
      }}
    >
      <div className="w-full">
        <div className="flex items-center py-4">
          <div className="flex gap-3 flex-1 ">
            <Select
              value={topicSelect}
              onValueChange={(value) => {
                setTopicSelect(value);
              }}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {topics.map((level) => (
                    <SelectItem key={level.id} value={level.id.toString()}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter name ..."
              value={searchValue}
              onChange={handleChange}
              className="max-w-sm"
            />
          </div>

          <div className="flex gap-3">
            <CreateForm open={openCreate} setOpen={setOpenCreate} />

            <EditForm id={wordIdEdit} setId={setWordIdEdit} />
            <AlertDelete word={wordDelete} setWord={setWordDelete} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal />
                  Views
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      {table.getAllColumns().map((_, index) => (
                        <TableCell key={index} className="text-center">
                          <Skeleton className="h-[30px] rounded-md mt-1" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}

              {table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : !isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <FooterPagination
            path={"words"}
            page={page}
            pageSize={pageSize}
            pageTotal={pageTotal}
            isLoading={isLoading}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </TableContext.Provider>
  );
}
