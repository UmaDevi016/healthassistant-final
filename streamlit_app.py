# streamlit_app.py (deploy-friendly, robust)
import streamlit as st
import requests
import os
import traceback
from dotenv import load_dotenv

load_dotenv()  # safe to call; Streamlit Cloud will ignore .env in repo

# default backend URL — override via Streamlit Secrets or the UI
DEFAULT_BACKEND = os.getenv("BACKEND_URL", "http://localhost:8000")

st.set_page_config(page_title="Multilingual Health Assistant — Demo", layout="centered")

st.title("Multilingual Health Assistant — Demo")
st.caption("Translate simple health messages and manage reminders (for demo only).")

# allow quick override in UI (useful for debugging)
if "backend_url" not in st.session_state:
    st.session_state.backend_url = DEFAULT_BACKEND

st.text_input("Backend URL (override)", value=st.session_state.backend_url, key="backend_input")
if st.button("Apply backend URL"):
    st.session_state.backend_url = st.session_state.backend_input
    st.success(f"Backend URL set to: {st.session_state.backend_url}")

BACKEND = st.session_state.backend_url.rstrip("/")

# Health check
with st.expander("Backend status / debug"):
    try:
        resp = requests.get(f"{BACKEND}/health", timeout=6)
        if resp.ok:
            st.success(f"Backend reachable: {resp.json()}")
        else:
            st.error(f"Backend returned error: {resp.status_code} {resp.text}")
    except Exception as e:
        st.error("Backend unreachable from Streamlit environment.")
        st.write("Exception:")
        st.code(traceback.format_exc(), language="python")

st.header("Translate")
txt = st.text_area("Health message", "")
lang = st.selectbox("Language", ["hi","ta","te","bn","es","fr","ar","en"], index=0)

if st.button("Translate"):
    if not txt.strip():
        st.warning("Please enter a short health message to translate.")
    else:
        with st.spinner("Translating..."):
            try:
                resp = requests.post(f"{BACKEND}/translate", json={"text": txt, "target_lang": lang}, timeout=12)
                if resp.ok:
                    data = resp.json()
                    translated = data.get("translated_text") or data.get("translation") or ""
                    if translated:
                        st.success("Translation:")
                        st.write(translated)
                    else:
                        st.warning("Translation returned empty. See raw response below.")
                        st.code(resp.text)
                else:
                    st.error(f"Translate failed: {resp.status_code} — {resp.text}")
            except Exception:
                st.error("Exception calling translate endpoint. See details below.")
                st.code(traceback.format_exc(), language="python")

st.header("Reminders")
with st.form("add_rem"):
    title = st.text_input("Medicine")
    note = st.text_input("Dosage")
    time = st.text_input("Time (e.g., 09:00)")
    submitted = st.form_submit_button("Add")
    if submitted:
        if not title.strip():
            st.warning("Please enter medicine name.")
        else:
            try:
                r = requests.post(f"{BACKEND}/add-reminder", json={"medicine": title, "dosage": note, "time": time, "language": "en"}, timeout=8)
                if r.ok:
                    st.success("Added")
                else:
                    st.error(f"Failed to add reminder: {r.status_code} — {r.text}")
            except Exception:
                st.error("Exception when adding reminder.")
                st.code(traceback.format_exc(), language="python")

if st.button("Load reminders"):
    try:
        r = requests.get(f"{BACKEND}/reminders", timeout=8)
        if r.ok:
            data = r.json().get("reminders", [])
            if not data:
                st.info("No reminders found.")
            for rem in data:
                st.write(f"**{rem.get('medicine')}** — {rem.get('dosage')} — {rem.get('time')}")
        else:
            st.error(f"Failed to load reminders: {r.status_code} — {r.text}")
    except Exception:
        st.error("Exception when loading reminders.")
        st.code(traceback.format_exc(), language="python")
