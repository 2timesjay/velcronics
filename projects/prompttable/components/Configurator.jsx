import React from 'react';

const Configurator = ({ testCaseSets, metricsPool, onConfigChange }) => {
  const [testCaseSet, setTestCaseSet] = React.useState('');
  const [selectedMetrics, setSelectedMetrics] = React.useState([]);

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
    onConfigChange(testCaseSet, selectedMetrics);
  };

  return (
    <form onSubmit={handleSubmit}>
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
