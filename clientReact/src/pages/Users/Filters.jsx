import React from "react";
import { CiSearch } from "react-icons/ci";
import { useStateContext } from "../../context/ContextProvider";

const Filters = ({ columnFilters, setColumnFilters, tag }) => {
  const taskName = columnFilters.find((f) => f.id === tag)?.value || "";
  const { currentColor } = useStateContext();

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <div>
      <div className="md:w-[25%] max-w-sm my-5">
        <label htmlFor="hs-as-table-product-review-search" className="sr-only">
          Search
        </label>
        <div
          className="relative border-2 rounded-xl border-gray-400"
          style={{ color: currentColor, borderColor: currentColor }}
        >
          <input
            type="text"
            id="hs-as-table-product-review-search"
            name="hs-as-table-product-review-search"
            className="py-2 px-3 ps-11 block w-full border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Search"
            value={taskName}
            onChange={(e) => onFilterChange(tag, e.target.value)}
          />
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
            <CiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
