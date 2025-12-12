import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

function App() {
  const [pollution, setPollution] = useState(50);
  const [symptoms, setSymptoms] = useState(10);
  const [pollen, setPollen] = useState(20);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [symptomToReport, setSymptomToReport] = useState(''); // New state for symptom report
  const [reportStatus, setReportStatus] = useState(null); // New state for report status

  const getRealtimeData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/get_realtime_data/`);
    const data = await response.json();
    setPollution(data.pollution_index);
    setSymptoms(data.symptom_reports);
    setPollen(data.pollen_level);
    setResult(null);
    setShowReport(false);
  };

  const getHealthScore = async () => {
    setIsLoading(true);
    const response = await fetch(`http://127.0.0.1:8000/health_score/?pollution_index=${pollution}&symptom_reports=${symptoms}&pollen_level=${pollen}`);
    const data = await response.json();
    setResult(data);
    setIsLoading(false);
    setShowReport(true);
  };

  const getInstantScore = async () => {
    setIsLoading(true);
    const dataResponse = await fetch(`http://127.0.0.1:8000/get_realtime_data/`);
    const data = await dataResponse.json();
    setPollution(data.pollution_index);
    setSymptoms(data.symptom_reports);
    setPollen(data.pollen_level);

    const scoreResponse = await fetch(`http://127.0.0.1:8000/health_score/?pollution_index=${data.pollution_index}&symptom_reports=${data.symptom_reports}&pollen_level=${data.pollen_level}`);
    const scoreData = await scoreResponse.json();
    setResult(scoreData);
    setIsLoading(false);
    setShowReport(true);
  };

  // New function to report a symptom to the backend
  const reportSymptom = async () => {
    const response = await fetch(`http://127.0.0.1:8000/report_symptom/?symptom=${symptomToReport}`, {
      method: 'POST',
    });
    const data = await response.json();
    setReportStatus(data.message);
    setSymptomToReport(''); // Clear the input field
  };

  const renderReport = () => {
    if (!result) return null;

    const chartData = [
      { name: 'Pollution', value: pollution },
      { name: 'Symptoms', value: symptoms },
      { name: 'Pollen', value: pollen },
      { name: 'Score', value: Math.round(result.score) },
    ];

    return (
      <div className="app-container">
        <div className="card">
          <h1>AI Health Report</h1>
          <p>Here is a detailed breakdown of the health risk score.</p>

          <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
              </ResponsiveContainer>
          </div>

          <div className="report-container">
            <div className="report-item">
              <h3>Overall Score</h3>
              <p className="score">{Math.round(result.score)}</p>
            </div>
            <div className="report-item">
              <h3>Risk Level</h3>
              <p className="risk-level">{result.risk_level}</p>
            </div>
            <div className="report-item">
              <h3>Advisory</h3>
              <p>{result.advisory}</p>
            </div>
            <div className="report-item">
              <h3>Contributing Factors</h3>
              <p>
                • Pollution: {pollution} <br />
                • Symptom Reports: {symptoms} <br />
                • Pollen Level: {pollen}
              </p>
            </div>
          </div>
          <button onClick={() => setShowReport(false)}>Go Back</button>
        </div>
      </div>
    );
  };

  const renderMainPage = () => (
    <div className="app-container">
      <div className="card">
        <h1>Alera: AI Health Score Predictor</h1>
        <p>Adjust the metrics below or fetch real-time data to get an AI-powered risk score.</p>

        <button className="secondary-button" onClick={getRealtimeData}>Fetch Data</button>

        <div className="input-group">
          <label>
            Pollution Index: <strong>{pollution}</strong>
            <input 
              type="range"
              min="0"
              max="100"
              value={pollution}
              onChange={(e) => setPollution(e.target.value)}
            />
          </label>
          <label>
            Symptom Reports: <strong>{symptoms}</strong>
            <input 
              type="range"
              min="0"
              max="100"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </label>
          <label>
            Pollen Level: <strong>{pollen}</strong>
            <input 
              type="range"
              min="0"
              max="100"
              value={pollen}
              onChange={(e) => setPollen(e.target.value)}
            />
          </label>
        </div>

        <button onClick={getInstantScore} disabled={isLoading}>
          {isLoading ? 'Calculating...' : 'Get Instant Health Score'}
        </button>

        <div className="report-symptom-container">
          <p>Anonymously report a symptom to contribute to our data:</p>
          <div className="symptom-input-group">
            <input
              type="text"
              placeholder="e.g., cough, headache"
              value={symptomToReport}
              onChange={(e) => setSymptomToReport(e.target.value)}
            />
            <button className="small-button" onClick={reportSymptom} disabled={!symptomToReport}>
              Report
            </button>
          </div>
          {reportStatus && <p className="report-status">{reportStatus}</p>}
        </div>
      </div>
    </div>
  );

  return showReport ? renderReport() : renderMainPage();
}

export default App;