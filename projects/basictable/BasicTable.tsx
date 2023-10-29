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

function BasicTable() {  
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
    setUnsavedChanges((prev) => {
      const existingChange = prev.find((change) => change.rowIdx === rowIdx);
      if (existingChange) {
        return prev.map((change) =>
          change.rowIdx === rowIdx ? { ...change, delta: newDelta } : change
        );
      } else {
        return [...prev, { rowIdx, delta: newDelta }];
      }
    });
  };
  
  const saveChanges = async () => {
    console.log("unsaved changes", unsavedChanges);
    try {
      // Replace with your service endpoint URL
      var changes = unsavedChanges.map((change) => {
        return {row: change.rowIdx, column: 2, new_value: change.delta}
      });
      const response = await axios.post("http://localhost:5000/update", changes);

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

  const loadState = async () => {
    console.log("unsaved changes", unsavedChanges);
    try {
      const response = await axios.get("http://localhost:5000/load_all");

      if (response.status === 200) {
        console.log("response", response.data)
        // Create dict from row_id to delta from [{row_id: 0, delta: 1}, ...] response
        const rowIdToDelta = response.data.reduce((acc, row) => {
          acc[row.row] = row.value;  // TODO: Harmonize names
          return acc;
        }, {} as Record<number, number>);
        setRows(
          rows.map((r, idx) => (idx in rowIdToDelta ? { ...r, delta: rowIdToDelta[idx] } : r))
        );
        setUnsavedChanges([]);
      } else {
        // Handle unsuccessful save response
        console.error("Bad server response when loading state:", response);
      }
    } catch (error) {
      // Handle request error
      console.error("Error loading state:", error);
    }
  };

  const isUnsaved = useCallback(
    (rowIdx: number) => {
      return unsavedChanges.some((change) => change.rowIdx === rowIdx);
    },
    [unsavedChanges]
  );

  return (
    <div className="BasicTable" tabIndex={0}>
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={loadState}>Load State</button>
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

export default BasicTable;
