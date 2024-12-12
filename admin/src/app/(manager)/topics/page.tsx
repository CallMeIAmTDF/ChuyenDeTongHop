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
import { useGetAllTopicQuery } from "@/queries/useTopic";
import { TopicResponse } from "@/types/topic";
import CreateForm from "@/app/(manager)/topics/create-form";
import EditForm from "@/app/(manager)/topics/edit-form";
import { AlertDelete } from "@/app/(manager)/topics/alert-delete";
import { LevelResponse } from "@/types/level";
import { useGetAllLevelQuery } from "@/queries/useLevel";

export const columns: ColumnDef<TopicResponse>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: "text",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "levelName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Level
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("levelName")}</div>
    ),
  },
  {
    accessorKey: "numWords",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            className=""
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Num Words
            <ArrowUpDown />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numWords")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { setTopicIdEdit, setTopicDelete } = useContext(TableContext);
      const [openDropdown, setOpenDropdown] = useState<boolean>(false);

      const openDetail = () => {
        setTopicIdEdit(row.original.id);
        setOpenDropdown(false);
      };

      const openAlertDelete = () => {
        setTopicDelete(row.original);
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
  topicIdEdit: number | undefined;
  setTopicIdEdit: (value: number) => void;
  topicDelete: TopicResponse | undefined;
  setTopicDelete: (value: TopicResponse | undefined) => void;
}>({
  topicIdEdit: undefined,
  setTopicIdEdit: (value: number | undefined) => {},
  topicDelete: undefined,
  setTopicDelete: (value: TopicResponse | undefined) => {},
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
  const [topicIdEdit, setTopicIdEdit] = useState<number | undefined>();
  const [topicDelete, setTopicDelete] = useState<TopicResponse | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [levelSelect, setLevelSelect] = useState<string>("");
  const debounce = useDebounce(searchValue);
  
  const pageAble: IModelPaginateRequest = {
    page: page - 1,
    size: pageSize,
    sort: [],
  };

  const { data, isLoading } = useGetAllTopicQuery({filter: "tname ~ '" + debounce + "'"}, pageAble, Number(levelSelect));
  const topics: TopicResponse[] = data?.payload.data?.result ?? [];
  const pageTotal = data?.payload.data?.meta.pages ?? 1;

  const queryLevels = useGetAllLevelQuery(
    { filter: "" },
    { page: 0, size: 0, sort: [] }
  );
  const levels: LevelResponse[] = queryLevels.data?.payload.data?.result ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  useEffect(() => {
    // reset pageIndex when pageSize changes and blank
    if (page < 0 || page > pageTotal) router.push("/topics");
  }, [pageTotal]);

  const table = useReactTable({
    data: topics,
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
        topicIdEdit,
        setTopicIdEdit,
        topicDelete,
        setTopicDelete,
      }}
    >
      <div className="w-full">
        <div className="flex items-center py-4">
          <div className="flex gap-3 flex-1 ">
            <Select
              value={levelSelect}
              onValueChange={(value) => {
                setLevelSelect(value);
              }}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {levels.map((level) => (
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

            <EditForm id={topicIdEdit} setId={setTopicIdEdit} />
            <AlertDelete topic={topicDelete} setTopic={setTopicDelete} />
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
            path={"topics"}
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
