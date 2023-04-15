import React from 'react';
import { Configuration, OpenAIApi } from 'openai';

const Configurator = ({ testCaseSets, metricsPool, onConfigChange }) => {
  const [testCaseSet, setTestCaseSet] = React.useState('');
  const [selectedMetrics, setSelectedMetrics] = React.useState([]);
  const [openAIKey, setOpenAIKey] = React.useState('');

  const handleOpenAIKeyChange = (e) => {
    setOpenAIKey(e.target.value);
  
    const fetchData = async () => {
      const configuration = new Configuration({
        apiKey: openAIKey,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: "turn the following into a python list: 3 eggs a dozen stalks of celery 1 pound of sugar.",
        temperature: 0,
        max_tokens: 100,
      });
  
      console.log(response);
    };
  
    fetchData();
  };

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
