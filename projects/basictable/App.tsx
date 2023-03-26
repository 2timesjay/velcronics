import React from "react";
import 'react-data-grid/lib/styles.css';
import DataGrid, { SelectColumn, textEditor, SelectCellFormatter } from 'react-data-grid';
import DeltaCellFormatter from "./DeltaCellFormatter";


interface SummaryRow {
  id: string;
  totalCount: number;
  deltaSum: number;
}

const deltaValues = [-1, 0, 1]

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { 
    key: 'delta', 
    name: 'Delta',
    width: 80,
    formatter({ row, onRowChange, deltaValueIndex=0 }) {
      return (
        <DeltaCellFormatter
          value={row.deltaValue}
          onChange={() => {
            onRowChange(
              { ...row, deltaValueIndex = (deltaValueIndex + 1) % deltaValues.length}
            );
          }}
          deltaValue={deltaValues[deltaValueIndex]}
        />
      );
    },
    // summaryFormatter({ row: { deltaSum, totalCount } }) {
    //   return <>{`${Math.floor((100 * deltaSum) / totalCount)}%`}</>;
    // }
  }
];

// const summaryRows = useMemo(() => {
//   const summaryRow: SummaryRow = {
//     id: 'total_0',
//     totalCount: rows.length,
//     deltaSum: rows.reduce((partialSum, a) => partialSum + a, 0)
//   };
//   return [summaryRow];
// }, [rows]);

const rows = [
  { id: 0, title: 'Example', delta: "-" },
  { id: 1, title: 'Demo', delta: "+" }
  { id: 2, title: 'Illustration', delta: "0" }
];

function App() {
  return (
    <div className="App">
      <DataGrid 
        columns={columns} 
        rows={rows} 
        // topSummaryRows={summaryRows}
        // bottomSummaryRows={summaryRows}
      />;
    </div>
  );
}

export default App;