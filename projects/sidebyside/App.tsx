import React from 'react';
import ReactDataGrid from 'react-data-grid';
// import './App.css';
import Table from './Table';

function App() {
  const columnNames = ['A', 'B', 'C', 'D'];
  const columnValues = [
    [
      'This is a long text that will be elided when not focused',
      'Some more long text that will be elided when not focused',
      '<b>HTML</b> content will <i>render</i> when row is focused',
      '<ul><li>HTML List</li><li>Item 2</li></ul>',
    ],
    [1, 2, 3, 4],
    [9, 10, 11, 12],
  ];
  const deltaColumns = [['B', 'C']];
  const callbackColumns = [
    {
      columnName: 'D',
      callback: (rowData: Record<string, string | number | null>) => {
        return (rowData['B'] as number) * (rowData['C'] as number);
      },
    },
  ];
  
  return (
    <div className="App">
      <Table
        columnNames={columnNames}
        columnValues={columnValues}
        deltaColumns={deltaColumns}
        callbackColumns={callbackColumns}
      />
    </div>
  );
}

export default App;