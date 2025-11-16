# streamlit_app.py
import streamlit as st
import requests
import os
from dotenv import load_dotenv

load_dotenv()

BACKEND = os.getenv("BACKEND_URL", "http://localhost:8000")

st.title("Multilingual Health Assistant — Demo")

st.header("Translate")
txt = st.text_area("Health message", "")
lang = st.selectbox("Language", ["hi","ta","te","bn","es","fr","ar","en"], index=0)
if st.button("Translate"):
    try:
        resp = requests.post(f"{BACKEND}/translate", json={"text": txt, "target_lang": lang}, timeout=10)
        if resp.ok:
            data = resp.json()
            st.success(data.get("translated_text"))
        else:
            st.error(f"Error: {resp.text}")
    except Exception as e:
        st.error(f"Exception: {e}")

st.header("Reminders")
with st.form("add_rem"):
    title = st.text_input("Medicine")
    note = st.text_input("Dosage")
    time = st.text_input("Time (e.g., 09:00)")
    if st.form_submit_button("Add"):
        r = requests.post(f"{BACKEND}/add-reminder", json={"medicine": title, "dosage": note, "time": time, "language": "en"})
        if r.ok:
            st.success("Added")
        else:
            st.error("Failed to add")

if st.button("Load reminders"):
    r = requests.get(f"{BACKEND}/reminders")
    if r.ok:
        for rem in r.json().get("reminders", []):
            st.write(f"**{rem['medicine']}** — {rem['dosage']} — {rem['time']}")
    else:
        st.error("Failed to load reminders")
