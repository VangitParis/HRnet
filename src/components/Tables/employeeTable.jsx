import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
// Import from react-table
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
// Imports from files utils, modelisation and mocks
import { tableColumns } from "../../utils/tableData";
import { mockTableData } from "../../mocks/data";
import { customDateSort } from "../../modelisation/modelisation";
// Import styles
import "../../styles/sass/components/_employeeTable.scss";

/**
 * EmployeeTable component for displaying and managing employee data in a table format.
 *
 * @component
 *
 * @param {Object} props - The properties of the EmployeeTable component.
 * @param {Array} props.data - The data to be displayed in the table.
 *
 * @returns {JSX.Element} - The EmployeeTable component.
 */
export default function EmployeeTable({ data }) {
  // React-table hooks and configurations
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
    setPageSize,
    previousPage,
    nextPage,
  } = useTable(
    {
      columns: tableColumns, // Defined elsewhere in the code
      data,
      customSortType: { customDateSort },
      initialState: { pageSize: 10 }, //initial pageSize=10
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  // Configure sorting for "Start Date" column
  const startDateColumn = headerGroups[0].headers.find(
    (column) => column.id === "startDate"
  );
  startDateColumn.sortType = (rowA, rowB) =>
    customDateSort(rowA, rowB, "startDate", startDateColumn.isSortedAsc);

  // Configure sorting for "Date of Birth" column
  const dateOfBirthColumn = headerGroups[0].headers.find(
    (column) => column.id === "dateOfBirth"
  );
  dateOfBirthColumn.sortType = (rowA, rowB) =>
    customDateSort(rowA, rowB, "dateOfBirth", dateOfBirthColumn.isSortedAsc);

  // JSX structure for rendering the table
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
      {/* Table */}
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
                    {column.isSorted && (
                      <FontAwesomeIcon
                        icon={column.isSortedDesc ? faSortDown : faSortUp}
                      />
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
                  <td {...cell.getCellProps()} className="custom-cells">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination and Info */}
      <div
        className="d-flex justify-content-between custom-info"
        role="status"
        aria-live="polite"
      >
        {/* Display the number of items shown on the current page compared to the total number of items in the table */}
        {`Showing ${
          page.length > 0 ? pageIndex * pageSize + 1 : 0
        } to ${Math.min((pageIndex + 1) * pageSize, page.length)} of ${
          rows.length
        } entries`}

        {rows.length &&
          globalFilter &&
          ` (filtered from ${mockTableData.length} total entries)`}

        <div className="pagination d-flex">
          <Link
            className="paginate_button previous"
            onClick={() => previousPage()}
            disabled={pageIndex === 0}
          >
            Previous
          </Link>{" "}
          <Link className="paginate_button current">{pageIndex + 1}</Link>
          <Link
            className="paginate_button next ml-1"
            onClick={() => nextPage()}
            disabled={pageIndex - 1}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
