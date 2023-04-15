import React from 'react';
import './App.css';
import Configurator from './components/Configurator';
import ComparisonTable from './components/ComparisonTable';

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

  const handleConfigChange = (openAIKey, testCaseSet, selectedMetrics) => {
    if(openAIKey != '') {
      const configuration = new Configuration({
        apiKey: openAIKey,
      });
      const openai = new OpenAIApi(configuration);
      setOpenAI(openai);
    }
    
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
  
    setColumns(newColumns);
  
    // Fetch data based on the selected test case set
    if (testCaseSet) {
      setData(testCaseSets[testCaseSet]);
    } else {
      setData([]);
    }
  };  

  const fetchData = async (data, key) => {
    if (key == '') {
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'text-babbage-001',
        prompt: 'turn the following into a python list: 3 eggs a dozen stalks of celery 1 pound of sugar.',
        temperature: 0,
        max_tokens: 100,
      }),
    };

    try {
      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="App">
      <Configurator
        testCaseSets={testCaseSets}
        metricsPool={metricsPool}
        onConfigChange={handleConfigChange}
      />
      <ComparisonTable columns={columns} data={data} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Evaluate</button>
      </form>
    </div>
  );
}

export default App;
