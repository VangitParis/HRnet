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

  // Ajouter une fonction pour inclure l'espace après la saisie du texte

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    setGlobalFilter,
    state : { pageIndex, pageSize, globalFilter },
    setPageSize,
    previousPage,
    nextPage,
  } = useTable(
   
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageSize: 10 }, //initial pageSize=10
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

      <div
        className="d-flex justify-content-between custom-info"
        role="status"
        aria-live="polite"
      >
        {/* Afficher le nombre d'éléments affichés dans la page actuelle par rapport au nombre total d'éléments dans le tableau */}
        {`Showing ${page.length >0 ? pageIndex * pageSize + 1 : 0} to ${Math.min(
          (pageIndex + 1) * pageSize,
          page.length
        ) } of ${ rows.length } entries`}
       
        {rows.length && globalFilter &&
          ` (filtered from ${tableData.length} total entries)`}

        <div className="pagination d-flex">
          <Link
            className="paginate_button previous"
            onClick={() => previousPage()}
            disabled={pageIndex === 0}
          >
            Previous
          </Link>{" "}
          <span>
            <Link className="paginate_button current">{pageIndex + 1}</Link>
          </span>
          <Link
            className="paginate_button next"
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
