const callLLM = async (prompt, key) => {
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
    prompt: prompt,
    temperature: 0,
    max_tokens: 100,
    }),
  };

  try {
    const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
    const data = await response.json();
    console.log(data);
    return data.choices[0].text;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


export default callLLM;