📌 Multilingual Health Assistant
An AI-powered health support tool for seniors with real-time translation, reminders, and emergency help.
🚀 Overview

The Multilingual Health Assistant is a simple, accessible health communication tool designed to help senior citizens understand health information in their native language.

This app uses:
FastAPI for backend
React for frontend
Lingo.dev API for translations
OpenAI Fallback when Lingo fails
Streamlit wrapper for easy deployment
SQLite Reminders database
Text-to-Speech for accessibility

The project is optimized for hackathons, accessibility, and multi-language support.
🧩 Features
✅ Real-Time Multilingual Translation
Supports 8 languages including Telugu, Hindi, Tamil, Bengali, French, Arabic, Spanish, and more.
Built using Lingo.dev + OpenAI fallback.
✅ Smart Health Assistant
Understands simple health queries
Produces translated output
Converts output to voice (TTS)
✅ Medicine Reminders
Users can set medicine reminders
Stored in SQLite database
FastAPI endpoints for adding, fetching, and deleting reminders
✅ Emergency Help Button
One-click emergency alert → Can notify friends/family.
✅ Fully Accessible
Large buttons
Clear typography
Voice output

Multilingual interface

📁 Project Structure
healthassitant/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── reminders.db
│
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   ├── hooks/
│   │   └── styles/
│   └── .env
│
├── streamlit_app.py
├── Dockerfile
├── lingo.config.json
├── README.md
└── .env

🛠️ Installation Guide
1️⃣ Backend Setup (FastAPI)
cd backend
python -m venv venv
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
Your backend runs on:
👉 http://localhost:8000
👉 http://localhost:8000/docs
2️⃣ Frontend Setup (React)
cd frontend
npm install
npm start
Frontend opens at:
👉 http://localhost:3000
3️⃣ Streamlit Deployment
If you want to run it using Streamlit UI:
streamlit run streamlit_app.py
🔑 Environment Variables
Create a .env file in the project root:
LINGO_API_KEY=your_lingo_api_key
OPENAI_API_KEY=your_openai_key
BACKEND_URL=http://localhost:8000
Frontend .env:
REACT_APP_BACKEND_URL=http://localhost:8000

🌍 Lingo.dev Configuration
lingo.config.json:
{
  "apiKey": "your_lingo_key",
  "projectId": "your_project_id",
  "sourceLanguage": "en",
  "targetLanguages": ["hi", "te", "ta", "bn", "es", "fr", "ar"],
  "inputPath": "./frontend/src/locales/en.json",
  "outputPath": "./frontend/src/locales"
}

Run Lingo CLI:
npx @lingo.dev/cli@latest i18n
📦 Backend API Endpoints
Method	Endpoint	Description
POST	/translate	Translate input text
POST	/reminders	Add medicine reminder
GET	/reminders	Fetch all reminders
DELETE	/reminders/{id}	Remove reminder
GET	/health	Health status check
🧪 Testing
Test backend with: http://localhost:8000/docs
Test translation from React frontend
Test reminder saving and retrieval
Test TTS output
Test Streamlit wrapper UI

🐳 Docker Support
To build Docker image:
docker build -t health-assistant .
docker run -p 8000:8000 health-assistant

🏆 Hackathon Pitch
“Our Multilingual Health Assistant empowers seniors by breaking language barriers in healthcare.
Powered by Lingo.dev, OpenAI, FastAPI, and React, it provides real-time translation, reminders, emergency help, and voice output — making healthcare information accessible to everyone.”

🤝 Contribution
Pull requests welcome!
Please open an issue first if you'd like to suggest big changes.

📄 License

This project is open-source under the MIT License.

