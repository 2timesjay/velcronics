import React from 'react';
import { useTable } from 'react-table';

const ComparisonTable = ({ columns, data, focusedRowId, setFocusedRowId }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const getCellValue = (cell) => {
    if (cell.column.id === 'question' || cell.column.id === 'baseline' || cell.column.id === 'variant') {
      return cell.row.id === focusedRowId ? (
        <pre style={{whiteSpace: 'normal'}}>{cell.value}</pre>
      ) : (
        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{cell.value}</div>
      );
    } else {
      return cell.render('Cell');
    }
  };

  return (
    <table {...getTableProps()} style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              onMouseEnter={() => setFocusedRowId(row.id)}
              onMouseLeave={() => setFocusedRowId(null)}
            >
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{getCellValue(cell)}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ComparisonTable;