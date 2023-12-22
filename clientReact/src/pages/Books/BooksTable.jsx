import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./BooksTable.css";
import Filters from "./Filters";
import { BiSort } from "react-icons/bi";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const BooksTable = ({ books }) => {
  const [data, setdata] = useState(books);
  const [columnFilters, setColumnFilters] = useState([]);
  const { currentColor } = useStateContext();

  function openDialog() {
    var dialog = document.getElementById("myDialog");
    dialog.showModal();
  }

  function closeDialog() {
    var dialog = document.getElementById("myDialog");
    dialog.close();
  }

  const columns = [
    {
      accessorKey: "ISBN",
      header: "ISBN",
      size: 150,
      cell: (props) => <p>{props.getValue()}</p>,
      enableColumnFilter: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 250,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "copiesAvailable",
      header: "Available",
      size: 150,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "totalCopies",
      header: "Total Copies",
      size: 150,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      size: 100,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "genre",
      header: "Genre",
      size: 225,
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div className="m-5">
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      <div
        style={{
          width: table.getTotalSize(),
        }}
      >
        {/* table Header  */}
        <div
          className="text-white font-medium"
          style={{
            backgroundColor: currentColor,
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="flex ">
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className="border-2 flex justify-between rounded-sm py-2 pl-2 min-w-fit items-center"
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.column.columnDef.header}

                  {/* sort  */}
                  {header.column.getCanSort() && (
                    <BiSort
                      className=""
                      onClick={header.column.getToggleSortingHandler()}
                    />
                  )}
                  {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]
                  }
                  {/* expanding  */}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer bg-white float-right ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* table Rows  */}
        <div className="dark:text-white font-medium border-x-2 text-ellipsis">
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className="flex py-2 border-b-2 shadow-sm ">
              <div className="flex">
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className="text-center text-ellipsis border-r-"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    <Link
                      to={`/books/explore/${row.original._id}`}
                      state={row.original}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksTable;
