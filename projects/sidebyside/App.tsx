import React from 'react';
import './App.css';
import Table from './Table';

function App() {
  const columnNames = ['A', 'B', 'C'];
  const columnValues = [
    [1, 2, 3, 4],
    [5, 6, 7, 2],
    [9, 10, 11, 12],
  ];
  const deltaColumns = [['A', 'B'], ['B', 'C']];

  return (
    <div className="App">
      <Table columnNames={columnNames} columnValues={columnValues} deltaColumns={deltaColumns} />
    </div>
  );
}

export default App;
