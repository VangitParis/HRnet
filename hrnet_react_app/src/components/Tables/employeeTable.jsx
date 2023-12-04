import React from "react";
import { useSelector } from "react-redux";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { tableColumns } from "../../utils/tableData";
import "../../styles/sass/components/_employeeTable.scss";

export default function EmployeeTable() {
  const employeesList = useSelector((state) => state.employees.list);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex},
    setGlobalFilter,
    setPageSize,
    previousPage,
    nextPage,
  } = useTable(
    {
      columns: tableColumns,
      data: employeesList,
    },
    useGlobalFilter, // Ajoutez le hook useGlobalFilter pour activer la recherche globale
    usePagination
  );
  return (
    <div className="table-responsive-sm">
      <div>
        <input
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
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {page.length}
          </strong>{" "}
        </span>
        <button onClick={() => previousPage()} >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {page.length}
        </span>
        <button onClick={() => nextPage()} >
          Next
        </button>
      </div>
    </div>
  );
}
