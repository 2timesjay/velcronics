import React from 'react';
import { useTable } from 'react-table';
import './ComparisonTable.css';

const ComparisonTable = ({
  columns,
  data,
  focusedRowId,
  setFocusedRowId,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="comparison-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="comparison-table-header">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              onMouseEnter={() => setFocusedRowId(row.id)}
              onMouseLeave={() => setFocusedRowId(null)}
            >
              {row.cells.map((cell) => {
                const isFocused = row.id === focusedRowId;
                const isQuestionOrResponse = cell.column.id === 'question' || cell.column.id === 'baseline' || cell.column.id === 'variant';
                const className = isQuestionOrResponse ? (isFocused ? 'pretty-print-cell' : 'compact-cell') : '';

                return (
                  <td {...cell.getCellProps()} className={`comparison-table-cell ${className}`}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ComparisonTable;
