import { useState } from 'react';
import './App.css'; 

function App() {
  const [pollution, setPollution] = useState(50);
  const [symptoms, setSymptoms] = useState(10);
  const [pollen, setPollen] = useState(20);
  const [result, setResult] = useState(null);

  const getHealthScore = async () => {
    // This is the API call to your backend
    const response = await fetch(`http://127.0.0.1:8000/health_score/?pollution_index=${pollution}&symptom_reports=${symptoms}&pollen_level=${pollen}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Alera: AI Health Score Predictor</h1>
        <p>Enter your local health metrics to get an AI-powered risk score.</p>
        <div className="input-group">
          <label>
            Pollution Index:
            <input type="number" value={pollution} onChange={(e) => setPollution(e.target.value)} />
          </label>
          <label>
            Symptom Reports:
            <input type="number" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
          </label>
          <label>
            Pollen Level:
            <input type="number" value={pollen} onChange={(e) => setPollen(e.target.value)} />
          </label>
        </div>
        <button onClick={getHealthScore}>Get Health Score</button>
        
        {result && (
          <div className="results-container">
            <h2>Health Score: {Math.round(result.score)}</h2>
            <p>Risk Level: <strong>{result.risk_level}</strong></p>
            <p>Advisory: {result.advisory}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;