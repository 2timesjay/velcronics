import React, { useMemo, useState } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

interface SummaryRow {
  id: string;
  totalCount: number;
  deltaSum: number;
}

const deltaValues = [-1, 0, 1];

function DeltaCellFormatter({ value, onChange }: { value: number; onChange: () => void }) {
  let backgroundColor = '';
  switch (value) {
    case -1:
      backgroundColor = '#ffc7ce';
      break;
    case 1:
      backgroundColor = '#c6efce';
      break;
    default:
      backgroundColor = '#fff';
      break;
  }

  return (
    <div 
      onClick={onChange} 
      style={{
        backgroundColor,
        padding: '5px',
        borderRadius: '5px',
        textAlign: 'center',
        cursor: 'pointer',
      }}>
      {value}
    </div>
  );
}

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  {
    key: "delta",
    name: "Delta",
    width: 80,
    formatter({ row, onRowChange }: GridCellProps) {
      const deltaValueIndex = deltaValues.indexOf(row.delta);

      return (
        <DeltaCellFormatter
          value={row.delta}
          onChange={() => {
            onRowChange({
              ...row,
              delta: deltaValues[(deltaValueIndex + 1) % deltaValues.length],
            });
          }}
          />
        );
      },
      summaryFormatter({ row: { deltaSum, totalCount } }: { row: SummaryRow }) {
        return <>{`${Math.floor((100 * deltaSum) / totalCount)}%`}</>;
      },
    },
  ];
  
  const initialRows = [
    { id: 0, title: "Example", delta: -1 },
    { id: 1, title: "Demo", delta: 1 },
    { id: 2, title: "Illustration", delta: 0 },
  ];
  
  function App() {
    const [rows, setRows] = useState(initialRows);
  
    const summaryRows = useMemo(() => {
      const summaryRow: SummaryRow = {
        id: "total_0",
        totalCount: rows.length,
        deltaSum: rows.reduce((partialSum, a) => partialSum + a.delta, 0),
      };
      return [summaryRow];
    }, [rows]);
  
    return (
      <div className="App">
        <DataGrid
          columns={columns}
          rows={rows}
          onRowsChange={setRows}
          topSummaryRows={summaryRows}
          bottomSummaryRows={summaryRows}
        />
      </div>
    );
  }
  
  export default App;
  