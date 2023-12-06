import React from "react";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import { tableColumns } from "../../utils/tableData";
import "../../styles/sass/components/_employeeTable.scss";

export default function EmployeeTable({ data }) {
  const tableData = data
  console.log(tableData);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex },
    setGlobalFilter,
    setPageSize,
    previousPage,
    nextPage,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData, 
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="table-responsive-sm">
      {/* Recherche dans le tableau */}
      <div>
        <label className="form-label fw-normal" htmlFor="search">
          Search:{" "}
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <table
        {...getTableProps()}
        className="table mx-auto mt-5 table-hover custom-table"
        id="employee-table"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="custom-header">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPageSize(10)}>10</button>
        <button onClick={() => setPageSize(25)}>25</button>
      </div>

      <div>
        <button onClick={() => previousPage()}>Previous</button>
        <button>{pageIndex + 1}</button>
        <button onClick={() => nextPage()}>Next</button>
      </div>
    </div>
  );
}
