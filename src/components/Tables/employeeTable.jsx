import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { validateAndFormatDate } from "../../modelisation/modelisation";

import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import {
  tableColumns,
  mockTableData,
} from "../../utils/tableData";
import "../../styles/sass/components/_employeeTable.scss";
import { Link } from "react-router-dom";


export default function EmployeeTable({ data }) {
  const customDateSort = (rowA, rowB, columnId, sortDesc) => {
    const dateA = validateAndFormatDate(rowA.values[columnId], "dd/MM/yyyy", new Date());
    const dateB = validateAndFormatDate(rowB.values[columnId], "dd/MM/yyyy", new Date());

    // On soustrait dateB de dateA pour obtenir l'ordre correct
    const comparison = dateA - dateB;
    // console.log("Date A:", dateA);
    // console.log("Date B:", dateB);
    // console.log("Comparison:", comparison);
    if (sortDesc) {
      // console.log("Sort Descending");
      return comparison * -1; // Inverser l'ordre pour le tri descendant
    } else {
      // console.log("Sort Ascending");
      return comparison;
    }
  };

  // console.log("Data:", data);
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
      columns: tableColumns,
      data,
      customSortType: { customDateSort },
      initialState: { pageSize: 10 }, //initial pageSize=10
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  // Modifier la configuration de tri pour la colonne "Start Date"
  const startDateColumn = headerGroups[0].headers.find(
    (column) => column.id === "startDate"
  );
  startDateColumn.sortType = (rowA, rowB) =>
    customDateSort(rowA, rowB, "startDate", startDateColumn.isSortedAsc);

  // Ajouter des console log pour déboguer
  // console.log("Header Groups:", headerGroups);

  // Modifier la configuration de la colonne "Date of Birth" après la création de la table
  const dateOfBirthColumn = headerGroups[0].headers.find(
    (column) => column.id === "dateOfBirth"
  );
  dateOfBirthColumn.sortType = (rowA, rowB) =>
    customDateSort(rowA, rowB, "dateOfBirth", dateOfBirthColumn.isSortedAsc);

  // console log pour déboguer
  // console.log("Header Groups:", headerGroups);

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

      <div
        className="d-flex justify-content-between custom-info"
        role="status"
        aria-live="polite"
      >
        {/* Afficher le nombre d'éléments affichés dans la page actuelle par rapport au nombre total d'éléments dans le tableau */}
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
