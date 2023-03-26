import React, { useMemo, useState } from 'react';
import DataGrid from 'react-data-grid';
import DeltaCellFormatter from './DeltaCellFormatter';
import 'react-data-grid/lib/styles.css';

const SummaryRow = ({ id, totalCount, deltaSum }) => {
  return <>{`${Math.floor((100 * deltaSum) / totalCount)}%`}</>;
};

const deltaValues = [-1, 0, 1];

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  {
    key: 'delta',
    name: 'Delta',
    editable: true,
    width: 80,
    formatter: ({ row, onRowChange }) => {
      var deltaValuesIndex = deltaValues.findIndex((v) => v === row.delta);
      return (
        <DeltaCellFormatter
          value={row.delta}
          onChange={() => {
            const newDeltaValuesIndex = (deltaValuesIndex + 1) % deltaValues.length;
            console.log("new row", { ...row, delta: deltaValues[newDeltaValuesIndex] })
            onRowChange({ ...row, delta: deltaValues[newDeltaValuesIndex] });
          }}
        />
      );
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

  return (
    <div className="App">
      <DataGrid
        columns={columns}
        rows={rowsState}
        onRowsChange={setRowsState}
        topSummaryRows={summaryRows}
        bottomSummaryRows={summaryRows}
      />
    </div>
  );
}

export default App;