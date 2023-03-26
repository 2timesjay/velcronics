import React, { useMemo, useState } from 'react';
import DataGrid from 'react-data-grid';
import DeltaCellFormatter from './DeltaCellFormatter';
import 'react-data-grid/lib/styles.css';

const SummaryRow = ({ id, totalCount, deltaSum }) => {
  return <>{`${Math.floor((100 * deltaSum) / totalCount)}%`}</>;
};

const deltaValues = [-1, 0, 1];

const columns = [
  { key: 'id', name: 'ID', width: 80 },
  { key: 'title', name: 'Title', width: 80},
  {
    key: 'delta',
    name: 'Delta',
    width: 80,
    editable: true,
    formatter({ row, onRowChange }) {
      const deltaValueIndex = deltaValues.indexOf(row.delta);
  
      const handleDeltaChange = () => {
        console.log(row);
        // onRowChange({
        //   ...row,
        //   delta: deltaValues[(deltaValueIndex + 1) % deltaValues.length],
        // });
        row['delta'] = deltaValues[(deltaValueIndex + 1) % deltaValues.length];
        console.log(row);
        onRowChange({
          ...row
        });
      };
  
      return <DeltaCellFormatter value={row.delta} onChange={handleDeltaChange} />;
    },
    summaryFormatter: ({ row }) => {
      return (
        <SummaryRow
          id={row.id}
          totalCount={row.totalCount}
          deltaSum={row.deltaSum}
        />
      );
    },
  },
];

const rows = [
  { id: 0, title: 'Example', delta: -1 },
  { id: 1, title: 'Demo', delta: 1 },
  { id: 2, title: 'Illustration', delta: 0 },
];

function App() {
  const [rowsState, setRowsState] = useState(rows);

  const summaryRows = useMemo(() => {
    const summaryRow = {
      id: 'total_0',
      totalCount: rowsState.length,
      deltaSum: rowsState.reduce((partialSum, { delta }) => partialSum + delta, 0),
    };
    return [summaryRow];
  }, [rowsState]);

  const handleRowChange = (updatedRow) => {
    const rowIndex = rowsState.findIndex((r) => r.id === updatedRow.id);
    const newRows = [...rowsState];
    newRows[rowIndex] = updatedRow;
    setRowsState(newRows);
  };

  return (
    <div className="App">
      <DataGrid
        columns={columns}
        rows={rowsState}
        onRowsChange={handleRowChange}
        topSummaryRows={summaryRows}
        bottomSummaryRows={summaryRows}
      />
    </div>
  );
}

export default App;