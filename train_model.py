import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib # A library to save and load models

# 1. Create a simple dataset
data = {'pollution_index': [30, 40, 50, 60, 70, 80, 90],
        'symptom_reports': [5, 10, 15, 20, 25, 30, 35],
        'pollen_level': [10, 20, 30, 40, 50, 60, 70],
        'risk_score': [20, 35, 50, 65, 80, 95, 110]}

df = pd.DataFrame(data)

# 2. Define the features (X) and target (y)
X = df[['pollution_index', 'symptom_reports', 'pollen_level']]
y = df['risk_score']

# 3. Train the model
model = LinearRegression()
model.fit(X, y)

# 4. Save the trained model to a file
joblib.dump(model, 'health_risk_model.joblib')

print("Model trained and saved as 'health_risk_model.joblib'")