// A column-oriented table React Component following standard best practices that accepts the following:
//
// * a list of column names
// * a list of lists, where each sublist is all the values of a given column. Empty or null values allowed.
// * a list of "delta" columns, calculated from pairs of normal columns. It shows difference of values between the columns (2nd column val - 1st column val), and it highlights green if positive, red if negative.
//
// It also has the following features:
//
// * The ability to sort the whole table ascending or descending by any column's values.
// * A "download as csv" button that lets you download row-oriented or column-oriented versions.
// * A "Add column" button that lets you add a column
// * A "add row" button that lets you add a row

import React, { useState } from 'react';
import './Table.css';

const Table = ({ columnNames, columnValues, deltaColumns }) => {
  const [columns, setColumns] = useState(columnValues);
  const [sortOrder, setSortOrder] = useState("asc");
  const [addingRow, setAddingRow] = useState(false);

  const sortTable = (columnIndex) => {
    const newColumns = [...columns];
    newColumns.forEach((column) => {
      column.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[columnIndex] - b[columnIndex];
        } else {
          return b[columnIndex] - a[columnIndex];
        }
      });
    });

    setColumns(newColumns);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const confirmRow = () => {
    setAddingRow(false);
  };

  const handleEdit = (columnIndex: number, rowIndex: number, value: string) => {
    const newColumns = [...columns];
    newColumns[columnIndex][rowIndex] = value === '' ? null : parseFloat(value);
    setColumns(newColumns);
  };

  const downloadCSV = (orientation) => {
    const csvRows = [];
    const separator = ",";

    if (orientation === "row") {
      for (let i = 0; i < columns[0].length; i++) {
        const row = columns.map((col) => col[i]).join(separator);
        csvRows.push(row);
      }
    } else {
      columns.forEach((column) => {
        const row = column.join(separator);
        csvRows.push(row);
      });
    }

    const csvString = csvRows.join("\n");
    const downloadLink = document.createElement("a");
    downloadLink.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvString);
    downloadLink.download = "data.csv";
    downloadLink.click();
  };

  const addColumn = () => {
    const newColumns = [...columns, Array(columns[0].length).fill(null)];
    setColumns(newColumns);
  };

  const addRow = () => {
    const newColumns = columns.map((column) => [...column, '']);
    setColumns(newColumns);
    setAddingRow(true);
  };

  const deltaColumn = (columnIndex) => {
    const deltaCol = [];
    for (let i = 0; i < columns[columnIndex].length; i++) {
      const diff = columns[columnIndex + 1][i] - columns[columnIndex][i];
      deltaCol.push(
        <div className={`delta-value ${diff > 0 ? "positive" : "negative"}`}>
          {diff}
        </div>
      );
    }
    return deltaCol;
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columnNames.map((name, index) => (
              <th key={index} onClick={() => sortTable(index)}>
                {name}
              </th>
            ))}
            {deltaColumns.map(([first, second]) => (
              <th key={`${first}-${second}`} className="delta-column">
                Δ({first}-{second})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns[0].map((_, rowIndex) => (
            <tr key={rowIndex} className={addingRow && rowIndex === columns[0].length - 1 ? 'new-row' : ''}>
              {columns.map((column, columnIndex) => (
                <td key={`${columnIndex}-${rowIndex}`}>{column[rowIndex]}</td>
              ))}
              {deltaColumns.map(([first, second]) => (
                <td key={`${first}-${second}-${rowIndex}`} className="delta-value-cell">
                  {deltaColumn(columnNames.indexOf(first))[rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} disabled={addingRow}>Add Row</button>
      {addingRow && <button onClick={confirmRow}>Confirm Row</button>}
      <button onClick={() => downloadCSV("row")}>Download as Row-oriented CSV</button>
      <button onClick={() => downloadCSV("column")}>Download as Row-oriented CSV</button>
    </div>
  );
};

export default Table;