import React from 'react';
import './App.css';
import Configurator from './components/Configurator';
import ComparisonTable from './components/ComparisonTable';
import callLLM from './utils/Caller';
import { useCSVDownloader} from 'react-papaparse';
import { usePapaParse } from 'react-papaparse';


const testCaseSets = {
  'Set 1': [
    { id: 1, question: 'Question 1', baseline: 'Baseline Response 1', variant: 'Variant Response 1' },
    { id: 2, question: 'Question 2', baseline: 'Baseline Response 2', variant: 'Variant Response 2' },
  ],
  'Set 2': [
    { id: 3, question: 'Question 3', baseline: 'Baseline Response 3', variant: 'Variant Response 3' },
    { id: 4, question: 'Question 4', baseline: 'Baseline Response 4', variant: 'Variant Response 4' },
  ],
  'Set 3': [
    { id: 5, question: 'Question 5', baseline: 'Baseline Response 5', variant: 'Variant Response 5' },
    { id: 6, question: 'Question 6', baseline: 'Baseline Response 6', variant: 'Variant Response 6' },
  ],
};

const metricsPool = ['Metric 1', 'Metric 2', 'Metric 3'];


function App() {
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [openai, setOpenAI] = React.useState(null);
  const [focusedRowId, setFocusedRowId] = React.useState(null);
  const [selectedMetrics, setSelectedMetrics] = React.useState([]);
  const [prompts, setPrompts] = React.useState(new Map());

  const handleCSVUpload = (event) => {
    const { readString } = usePapaParse();
    const file = event.target.files[0];
  
    console.log(file);
    readString(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        console.log(results.data);
        setData(results.data);
        refreshColumns(selectedMetrics);
      },
    });
  };

  const handleConfigChange = (openAIKey, testCaseSet) => {
    if(openAIKey != '') {
      setOpenAI(openAIKey);
    }

    refreshColumns(selectedMetrics);
  
    // Fetch data based on the selected test case set
    if (testCaseSet) {
      setData(testCaseSets[testCaseSet]);
    } else {
      setData([]);
    }
  };  

  const handleUserInputChange = (rowId, value) => {
    const newData = data.map(row => {
      if (row.id === rowId) {
        return { ...row, userInput: value };
      }
      return row;
    });
    setData(newData);
  };

  const refreshColumns = (selectedMetrics) => {
    const newColumns = [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Question', accessor: 'question' },
      { Header: 'Baseline Response', accessor: 'baseline' },
      { Header: 'Variant Response', accessor: 'variant' },
    ];
  
    selectedMetrics.forEach((metric) => {
      newColumns.push(
        { Header: `${metric} Baseline`, accessor: `${metric.toLowerCase().replace(' ', '')}_baseline` },
        { Header: `${metric} Variant`, accessor: `${metric.toLowerCase().replace(' ', '')}_variant` },
        { Header: `${metric} Delta`, accessor: `${metric.toLowerCase().replace(' ', '')}_delta` },
      );
    });
    newColumns.push(
      {
        Header: 'User Input',
        accessor: 'userInput',
        Cell: ({ row, value }) => (
          <input
            type="text"
            value={value || ''}
            onChange={e => console.log(e.target.value)}
            // onChange={e => handleUserInputChange(row.id, e.target.value)}
          />
        ),
      }
    )
    setColumns(newColumns);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call LLM for each row
    const results_promise = Promise.all(data.map((row) => callLLM(row.question, openai)))
    // Set response column with results from LLM
    results_promise
      .then(results => {
        console.log(results)
        console.log(data.map((row, idx) => { return {...row, baseline: results[idx]}}))
        setData(data.map((row, idx) => { return {...row, baseline: results[idx]}}))
      }).catch(error => {
        console.error(error)
      });
  };

  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <div className="App">
      <Configurator
        testCaseSets={testCaseSets}
        metricsPool={metricsPool}
        onConfigChange={handleConfigChange}
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
        prompts={prompts}
        setPrompts={setPrompts}
      />
      <ComparisonTable columns={columns} data={data} focusedRowId={focusedRowId} setFocusedRowId={setFocusedRowId} />
      <CSVDownloader
        type={Type.Button}
        filename={'table-data'}
        bom={true}
        config={{ // Do I have to escape commas inside cells?
          delimiter: ',',
        }}
        data={data}
      >
        <span>Download as CSV</span>
      </CSVDownloader>
      <input
        type="file"
        id="csvUpload"
        accept=".csv"
        onChange={handleCSVUpload}
      />
      <form onSubmit={handleSubmit}>
        <button type="submit">Evaluate</button>
      </form>
    </div>
  );
}

export default App;
