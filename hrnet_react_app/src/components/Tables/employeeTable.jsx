import React from "react";
import { useSelector } from "react-redux";
import { useTable } from 'react-table';
import { tableColumns } from "../../utils/tableData";
import "../../styles/sass/components/_employeeTable.scss";

export default function EmployeeTable() {
  const employeesList = useSelector((state) => state.employees.list);

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }  = useTable({
    columns: tableColumns,
    data: employeesList,
  });
  return(
<div className="table-responsive-sm rounded">
<table {...getTableProps()} className="table custom-table mx-auto mt-5 table-hover" id="employee-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="custom-header">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      </table>
      </div>
)}
