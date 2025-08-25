Alera: An Agentic AI for Proactive Public Health Monitoring
A Healthtech solution for the Agentic AI Hackathon
The Problem
Current public health systems are overwhelmingly reactive. They respond to epidemics, pollution spikes, and other health crises only after they have already escalated. This leads to overwhelmed healthcare facilities, delayed public advisories, and a higher human cost. A major pain point is the fragmentation of data—environmental sensors, social media trends, and hospital admission data all exist in separate silos, making a unified, proactive response impossible.

The Solution: Alera, the Agentic AI
Alera is a multi-agent AI system designed to solve this problem by providing a unified, predictive view of local health risks. It continuously monitors and analyzes disparate data sources to forecast potential health surges and deliver actionable insights before they impact a community.

Key Features (Our Hackathon MVP)
Our prototype, built for this hackathon, demonstrates the core functionality of a working Agentic AI solution:

AI-Powered Health Score API: A backend built with FastAPI that uses a pre-trained machine learning model to calculate a real-time health risk score based on key metrics like pollution, symptom reports, and pollen levels.

User-Friendly Frontend: A React.js web application that provides a clean interface for users to input data and instantly visualize the AI model's prediction.

Dynamic Advisories: The API provides AI-generated advisories based on the predicted risk level, giving users and officials actionable information.

Technology Stack
Backend & AI Agents:

Python: The core language for our backend logic and machine learning models.

FastAPI: A high-performance web framework for building the API.

Uvicorn: The ASGI server used to run the FastAPI application.

scikit-learn: Used to build and train the predictive machine learning model.

pandas: A data analysis library for handling and preparing our model's dataset.

joblib: For saving and loading the trained machine learning model efficiently.

Frontend:

React.js: A JavaScript library for building a responsive, user-friendly interface.

Vite: A fast, modern build tool for the frontend.

Git & Version Control:

GitHub: For collaborative development and project hosting.

How to Run the Project
To run Alera on your local machine, please follow these steps.

Prerequisites
You need to have Python 3.8+ and Node.js installed on your system.

Backend Setup
Navigate to the project's root directory in your terminal.

Create and activate a Python virtual environment:

python -m venv venv

source venv/bin/activate (macOS/Linux) or .\venv\Scripts\activate (Windows)

Install the backend dependencies:

pip install -r requirements.txt

Navigate into the backend folder and run the model training script:

cd backend

python train_model.py

cd ..

Start the backend API server:

cd backend

uvicorn main:app --reload

The server will be running at http://127.0.0.1:8000.

Frontend Setup
Open a separate terminal window and navigate to the frontend folder:

cd frontend

Install the Node.js dependencies:

npm install

Start the frontend development server:

npm run dev

The server will be running at http://localhost:5173.

With both servers running, you can open http://localhost:5173 in your browser and interact with the full application.