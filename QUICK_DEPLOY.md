# 🚀 Quick Deployment Guide - Health Assistant

Choose one deployment option below based on your preference and infrastructure.

## ⚡ Option 1: Railway.app (Fastest - Recommended)

**Why Railway?** Easiest setup, free tier available, auto-scales, instant deploys.

### Steps:

1. **Create Railway account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Connect repository**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `healthassistant-final`
   - Railway auto-detects Dockerfile

3. **Add environment variables**
   - In Railway dashboard, go to "Variables"
   - Add these secrets:
   ```
   LINGO_API_KEY=<your_api_key>
   LINGO_PROJECT_ID=<your_project_id>
   OPENAI_API_KEY=<your_key>
   GROQ_API_KEY=<your_key>
   REACT_APP_BACKEND_URL=<your-app>.up.railway.app
   ```

4. **Deploy**
   ```bash
   git push origin main
   ```
   Railway automatically builds and deploys!

**✅ Done!** Your app is live at `your-app.up.railway.app`

---

## 🎯 Option 2: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create app**
   ```bash
   heroku create health-assistant-demo
   heroku stack:set container
   ```

3. **Set environment variables**
   ```bash
   heroku config:set LINGO_API_KEY=<your_key>
   heroku config:set LINGO_PROJECT_ID=<your_project_id>
   heroku config:set OPENAI_API_KEY=<your_key>
   heroku config:set GROQ_API_KEY=<your_key>
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

**✅ Live at:** `health-assistant-demo.herokuapp.com`

---

## 🐳 Option 3: Docker Compose (Local Testing)

**Before deployment, test locally:**

1. **Ensure Docker is running** (start Docker Desktop)

2. **Build and start**
   ```bash
   # PowerShell
   .\deploy-local.ps1
   
   # Linux/Mac
   chmod +x deploy-local.sh
   ./deploy-local.sh
   ```

3. **Access:**
   - Frontend: http://localhost:8000
   - Streamlit: http://localhost:8501
   - API: http://localhost:8000/health

---

## ☁️ Option 4: Google Cloud Run

1. **Install Google Cloud CLI**
   ```bash
   # Windows: Download from https://cloud.google.com/sdk/docs/install
   ```

2. **Authenticate**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Deploy**
   ```bash
   gcloud run deploy health-assistant \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

**✅ Live at:** `health-assistant-xxxxx.run.app`

---

## 🎪 Option 5: AWS (EC2 + Docker)

1. **Launch EC2 Instance** (Ubuntu 22.04)

2. **SSH into instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Docker**
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io
   sudo usermod -aG docker ubuntu
   ```

4. **Clone and deploy**
   ```bash
   git clone https://github.com/UmaDevi016/healthassistant-final.git
   cd healthassistant-final
   docker build -t health-assistant .
   docker run -d -p 80:8000 health-assistant
   ```

**✅ Live at:** `http://your-instance-ip`

---

## 📋 Environment Variables Summary

| Variable | Purpose | Where to Get |
|----------|---------|------|
| `LINGO_API_KEY` | Translation API | Lingo.dev dashboard |
| `LINGO_PROJECT_ID` | Project identifier | Lingo.dev settings |
| `OPENAI_API_KEY` | Fallback translations | OpenAI platform |
| `GROQ_API_KEY` | Alternative LLM | Groq console |
| `REACT_APP_BACKEND_URL` | Backend URL | Your deployed domain |

---

## ✅ Post-Deployment Checklist

After deploying to any platform:

- [ ] Application loads without errors
- [ ] Backend health check passes: `curl https://your-app/health`
- [ ] Translation works: `curl -X POST https://your-app/translate -d '{"text":"Hello","target_language":"hi"}'`
- [ ] Frontend displays properly
- [ ] All 7 languages work
- [ ] All API keys are configured

---

## 🔍 Testing Endpoints

Test your deployed application:

```bash
# Health check
curl https://your-app.com/health

# Translate text
curl -X POST https://your-app.com/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","target_language":"hi"}'
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | Check: env variables set, ports available, logs |
| Translation fails | Verify: API keys valid, internet connected |
| Frontend errors | Check: REACT_APP_BACKEND_URL correct, CORS enabled |
| Out of memory | Increase container memory limits |

---

## 🚨 Security Notes

1. **Never commit secrets to git**
2. **Use platform secrets**, not hardcoded values
3. **Rotate API keys** after deployment
4. **Enable HTTPS** (automatic on most platforms)
5. **Monitor API usage** for unauthorized access

---

## 📊 Deployment Timeline

```
Push to main branch
        ↓
GitHub Actions triggers
        ↓
Docker image builds
        ↓
Deploy to platform
        ↓
App goes live!
```

---

**Ready to deploy? Choose your platform above and follow the steps!** 🚀
