import React, {useEffect} from 'react';

const Configurator = ({ 
  testCaseSets, 
  metricsPool, 
  onConfigChange,
  selectedMetrics,
  setSelectedMetrics
}) => {
  const [testCaseSet, setTestCaseSet] = React.useState('');
  const [openAIKey, setOpenAIKey] = React.useState('');

  const handleOpenAIKeyChange = (e) => {
    setOpenAIKey(e.target.value);
  };
  
  
  
  useEffect(() => {
    const fetchData = async (key) => {
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
    fetchData(openAIKey)
  }, [openAIKey]);

  const handleTestCaseSetChange = (e) => {
    setTestCaseSet(e.target.value);
  };

  const handleMetricChange = (e) => {
    const metric = e.target.value;
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.includes(metric) ? prevMetrics.filter((m) => m !== metric) : [...prevMetrics, metric]
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onConfigChange(openAIKey, testCaseSet, selectedMetrics);
  };

  // Create a textbox captioned "Openai key"
      
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          OpenAI API key:
          <input 
            type="text" 
            placeholder="<my OPENAI_API_KEY>" 
            onChange={handleOpenAIKeyChange}/>
        </label>
      </div>
      <div>
        <label>
          Test Case Set:
          <select value={testCaseSet} onChange={handleTestCaseSetChange}>
            <option value="">Select a set</option>
            {Object.keys(testCaseSets).map((set) => (
              <option key={set} value={set}>
                {set}
              </option> 
            ))}
          </select>
        </label>
      </div>
      <fieldset>
        <legend>Metrics:</legend>
        {metricsPool.map((metric) => (
          <label key={metric}>
            <input
              type="checkbox"
              value={metric}
              checked={selectedMetrics.includes(metric)}
              onChange={handleMetricChange}
            />
            {metric}
          </label>
        ))}
      </fieldset>
      
      <button type="submit">Confirm</button>
    </form>
  );
};

export default Configurator;
