import React from "react";
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function App() {
  return <DataGrid columns={columns} rows={rows} />;
}

export default App;
// import React from "react";
// import ReactDataGrid from "react-data-grid";
// import "./DataGrid.css";

// export default function DataGrid() {

// 	const columns = [
// 		{ key: "id", name: "ID" },
// 		{ key: "name", name: "Name" },
// 		{ key: "amount", name: "Amount" }
// 	];

// 	const rows = [
// 		{ id: 0, name: "row1", amount: 10 },
// 		{ id: 1, name: "row2", amount: 20 },
// 		{ id: 2, name: "row3", amount: 30 }
// 	];

// //   <ReactDataGrid
// //     columns={columns}
// //     rowGetter={i => rows[i]}
// //     rowsCount={3}
// //   />
// 	return (
// 		<div className="DataGrid">
// 			<ReactDataGrid
// 				columns={columns}
// 				rows={rows}
// 			/>
// 		</div>
// 	);
// }