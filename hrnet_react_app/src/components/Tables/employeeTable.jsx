import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { tableColumns } from "../../utils/tableData";
import "../../styles/sass/components/_employeeTable.scss"; // Ajout de l'import pour vos styles
import { Link } from "react-router-dom";

export default function EmployeeTable({ data }) {
  const tableData = data;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, totalItems },
    setGlobalFilter,
    setPageSize,
    previousPage,
    nextPage,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageSize: 10 }, // Définissez le pageSize initial ici
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="employee-table table-responsive-sm">
      <div className="d-flex search">
        <label className="form-label fw-normal" htmlFor="pageSize">
          Show&nbsp;
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          &nbsp;entries
        </label>

        <label className="form-label fw-normal" htmlFor="search">
          Search:&nbsp;
          <input
            id="search"
            type="text"
            placeholder=""
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </label>
      </div>
      <table
        {...getTableProps()}
        className="table mx-auto mt-1 table-hover custom-table"
        id="employee-table"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="custom-header"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faSortDown} />
                      ) : (
                        <FontAwesomeIcon icon={faSortUp} />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      <div className="custom-info" role="status" aria-live="polite">
        {`Showing ${totalItems} to ${totalItems} of ${totalItems} entries`}
      </div>{" "}
      <div className="pagination d-flex">
        <Link
          className="paginate_button previous"
          onClick={() => previousPage()} disabled={pageIndex === 0}>
          Previous
        </Link>{" "}
        <span>
          <Link className="paginate_button current">{pageIndex + 1}</Link>
        </span>
        <Link
          className="paginate_button next"
          onClick={() => nextPage()}
          disabled={pageIndex === Math.ceil(totalItems / pageSize) - 1}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
