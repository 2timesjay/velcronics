import axios from "axios"; // Import axios or your preferred library to make HTTP requests
import React, { useMemo, useState, useCallback } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

interface SummaryRow {
  id: string;
  totalCount: number;
  deltaSum: number;
}

const deltaValues = [-1, 0, 1];

interface DeltaCellFormatterProps {
  value: number;
  onChange(rowIdx: number, newDelta: number): void;
  isUnsaved: boolean;
}

const DeltaCellFormatter: React.FC<DeltaCellFormatterProps> = ({ value, onChange, isUnsaved }) => {
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
  const textStyle = isUnsaved ? { color: "grey" } : {};

  return (
    <div 
      onClick={onChange} 
      style={{
        backgroundColor,
        padding: '5px',
        borderRadius: '5px',
        textAlign: 'center',
        cursor: 'pointer',
        ...textStyle
      }}>
      {value}
    </div>
  );
};

// export default DeltaCellFormatter;

// columns={columns.map((col) => {
//   if (col.key === "delta") {
//     return {
//       ...col,
//       formatter: (props: GridCellProps) => {
//         const deltaValueIndex = deltaValues.indexOf(props.row.delta);

//         return (
//           <DeltaCellFormatter
//             value={props.row.delta}
//             onChange={handleDeltaChange}
//             isUnsaved={isUnsaved(props.rowIdx)}
//           />
//         );
//       },
//     };
//   }
//   return col;
// })}

function App() {  
  const initialRows = [
    { id: 0, title: "Example", delta: -1 },
    { id: 1, title: "Demo", delta: 1 },
    { id: 2, title: "Illustration", delta: 0 },
  ];

  const [rows, setRows] = useState(initialRows);
  const [unsavedChanges, setUnsavedChanges] = useState<Array<{ rowIdx: number; delta: number }>>([]);

  const columns = [
    { key: "id", name: "ID", width: 80 },
    { key: "title", name: "Title", width: 80 },
    {
      key: "delta",
      name: "Delta",
      width: 80,
      editable: true,
      formatter({ row, onRowChange }) {
        const deltaValueIndex = deltaValues.indexOf(row.delta);
  
        return (
          <DeltaCellFormatter
            value={row.delta}
            onChange={() => {
              onRowChange({
                ...row,
                delta: deltaValues[(deltaValueIndex + 1) % deltaValues.length],
              });
              handleDeltaChange(
                row.id, 
                deltaValues[(deltaValueIndex + 1) % deltaValues.length]
              );
            }}
            isUnsaved={isUnsaved(row.id)}
          />
        );
      },
      summaryFormatter({ row: { deltaSum, totalCount } }: { row: SummaryRow }) {
        return <>{`${Math.floor((100 * deltaSum) / totalCount)}%`}</>;
      },
    },
  ];

  const summaryRows = useMemo(() => {
    const summaryRow: SummaryRow = {
      id: "total_0",
      totalCount: rows.length,
      deltaSum: rows.reduce((partialSum, a) => partialSum + a.delta, 0),
    };
    return [summaryRow];
  }, [rows]);

  const handleDeltaChange = (rowIdx: number, newDelta: number) => {
    console.log("handleDeltaChange", rowIdx, newDelta)
    setRows(
      rows.map((r, idx) => (idx === rowIdx ? { ...r, delta: newDelta } : r))
    );
    setUnsavedChanges((prev) => [...prev, { rowIdx, delta: newDelta }]);
  };
  
  const saveChanges = async () => {
    try {
      // Replace with your service endpoint URL
      const response = await axios.post("https://your-service-endpoint-url.com/api/save-changes", {
        changes: unsavedChanges,
      });

      if (response.status === 200) {
        setUnsavedChanges([]);
      } else {
        // Handle unsuccessful save response
        console.error("Error saving changes:", response);
      }
    } catch (error) {
      // Handle request error
      console.error("Error saving changes:", error);
    }
  };

  const isUnsaved = useCallback(
    (rowIdx: number) => {
      return unsavedChanges.some((change) => change.rowIdx === rowIdx);
    },
    [unsavedChanges]
  );

  return (
    <div className="App">
      <button onClick={saveChanges}>Save</button>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        topSummaryRows={summaryRows}
        bottomSummaryRows={summaryRows}
        // onCellClick={(e) => console.log(e)}
      />
    </div>
  );
}

export default App;
