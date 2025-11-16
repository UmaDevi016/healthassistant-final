import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function App() {
  const [tab, setTab] = useState("translate");
  const [text, setText] = useState("");
  const [lang, setLang] = useState("hi");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [reminders, setReminders] = useState([]);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("09:00");
  const [notice, setNotice] = useState("");

  const languages = [
    { code: "hi", label: "Hindi" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
    { code: "bn", label: "Bengali" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "ar", label: "Arabic" },
    { code: "en", label: "English" }
  ];

  useEffect(() => {
    fetchReminders();
  }, []);

  async function fetchReminders() {
    try {
      const r = await axios.get(`${BACKEND}/reminders`);
      setReminders(r.data.reminders || []);
    } catch (e) {
      console.error(e);
      setNotice("Could not load reminders.");
    }
  }

  async function translate() {
    if (!text.trim()) return setNotice("Please enter a message.");
    setLoading(true);
    setNotice("");
    setResult("");
    try {
      const r = await axios.post(`${BACKEND}/translate`, { text, target_lang: lang });
      setResult(r.data.translated_text || "");
      setNotice("Translation ready.");
    } catch (e) {
      console.error(e);
      setNotice("Translation failed.");
    } finally {
      setLoading(false);
    }
  }

  function speak(textToSpeak) {
    if (!textToSpeak) return;
    try {
      const u = new SpeechSynthesisUtterance(textToSpeak);
      u.lang = lang;
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch {
      setNotice("Speech not supported in this browser.");
    }
  }

  async function addReminder() {
    if (!medicine.trim() || !dosage.trim()) return setNotice("Enter medicine and dosage.");
    try {
      await axios.post(`${BACKEND}/add-reminder`, { medicine, dosage, time, language: lang });
      setMedicine(""); setDosage(""); setTime("09:00");
      setNotice("Reminder added.");
      fetchReminders();
    } catch {
      setNotice("Failed to add reminder.");
    }
  }

  async function deleteRem(id) {
    try {
      await axios.delete(`${BACKEND}/reminders/${id}`);
      setNotice("Reminder deleted.");
      fetchReminders();
    } catch {
      setNotice("Failed to delete reminder.");
    }
  }

  async function emergency() {
    try {
      await axios.post(`${BACKEND}/emergency-alert`, { message: "Health emergency", caregiver_contact: "" });
      setNotice("Emergency alert simulated.");
    } catch {
      setNotice("Emergency alert failed.");
    }
  }

  return (
    <div className="container">
      <h1>Multilingual Health Assistant</h1>
      <p className="subtitle">Simple, clear health messages in many languages</p>

      <div className="tabs">
        <button className={`tab ${tab==="translate" ? "active" : ""}`} onClick={()=>setTab("translate")}>Translate</button>
        <button className={`tab ${tab==="reminders" ? "active" : ""}`} onClick={()=>setTab("reminders")}>Reminders</button>
        <button className={`tab ${tab==="emergency" ? "active" : ""}`} onClick={()=>setTab("emergency")}>Emergency</button>
      </div>

      {notice && <div className="notice">{notice}</div>}

      {tab === "translate" && (
        <div className="card">
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Enter health message..." />
          <div className="row">
            <select value={lang} onChange={e=>setLang(e.target.value)}>
              {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <button onClick={translate} disabled={loading}>{loading ? "Translating..." : "Translate"}</button>
            <button onClick={()=>speak(result)} disabled={!result}>Hear</button>
          </div>
          {result && <div className="result"><strong>Translation:</strong><p>{result}</p></div>}
        </div>
      )}

      {tab === "reminders" && (
        <div className="card">
          <input value={medicine} onChange={e=>setMedicine(e.target.value)} placeholder="Medicine name" />
          <input value={dosage} onChange={e=>setDosage(e.target.value)} placeholder="Dosage (e.g., 1 tablet)" />
          <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
          <div className="row">
            <button onClick={addReminder}>Add Reminder</button>
            <button onClick={fetchReminders}>Refresh</button>
          </div>
          <div className="rem-list">
            {reminders.length === 0 ? <p>No reminders.</p> :
              reminders.map(r => (
                <div key={r.id} className="rem-item">
                  <div>
                    <strong>{r.medicine}</strong>
                    <div className="small">{r.dosage} • {r.time}</div>
                  </div>
                  <button onClick={()=>deleteRem(r.id)}>Delete</button>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {tab === "emergency" && (
        <div className="card">
          <p>If urgent help is needed, press the button below to notify caregivers (simulated).</p>
          <button className="danger" onClick={emergency}>Send Emergency Alert</button>
        </div>
      )}
    </div>
  );
}
