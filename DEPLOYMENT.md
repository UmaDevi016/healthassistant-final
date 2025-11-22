# Deployment Guide - Health Assistant

This guide covers multiple deployment options for your Health Assistant application.

## 📋 Prerequisites

Before deploying, ensure:
- Git repository is up to date
- All environment variables are set in the deployment platform
- Docker is installed (for containerized deployments)

## 🚀 Deployment Options

### Option 1: Railway.app (Recommended - Easiest)

Railway is a modern platform with Git integration and automatic deployments.

**Setup:**
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `healthassistant-final` repository
5. Railway auto-detects Dockerfile and deploys

**Environment Variables:**
In Railway dashboard, add under "Variables":
```
LINGO_API_KEY=<your_api_key>
LINGO_PROJECT_ID=<your_project_id>
OPENAI_API_KEY=<your_openai_key>
GROQ_API_KEY=<your_groq_key>
REACT_APP_BACKEND_URL=https://your-railway-app.up.railway.app
```

**Deploy:**
- Push to `main` branch → automatic deployment
- View logs: Railway dashboard

---

### Option 2: Heroku

**Setup:**
1. Create account at [Heroku.com](https://heroku.com)
2. Install Heroku CLI: `npm install -g heroku`
3. Login: `heroku login`

**Create app:**
```bash
heroku create health-assistant
heroku stack:set container
```

**Set environment variables:**
```bash
heroku config:set LINGO_API_KEY=<your_api_key>
heroku config:set LINGO_PROJECT_ID=<your_project_id>
heroku config:set OPENAI_API_KEY=<your_openai_key>
heroku config:set GROQ_API_KEY=<your_groq_key>
heroku config:set REACT_APP_BACKEND_URL=https://health-assistant.herokuapp.com
```

**Deploy:**
```bash
git push heroku main
```

---

### Option 3: Docker (Local/VPS)

**Build Docker image:**
```bash
docker build -t health-assistant:latest .
```

**Run container:**
```bash
docker run -p 8000:8000 \
  -e LINGO_API_KEY=<your_api_key> \
  -e LINGO_PROJECT_ID=<your_project_id> \
  -e OPENAI_API_KEY=<your_openai_key> \
  -e GROQ_API_KEY=<your_groq_key> \
  health-assistant:latest
```

**Push to Docker Hub:**
```bash
docker tag health-assistant:latest yourusername/health-assistant:latest
docker push yourusername/health-assistant:latest
```

---

### Option 4: AWS EC2

**Setup:**
1. Launch EC2 instance (Ubuntu 22.04)
2. SSH into instance
3. Install Docker: `sudo apt-get install docker.io`

**Deploy:**
```bash
# Clone repo
git clone https://github.com/UmaDevi016/healthassistant-final.git
cd healthassistant-final

# Build and run
docker build -t health-assistant .
docker run -d -p 80:8000 \
  -e LINGO_API_KEY=$LINGO_API_KEY \
  -e LINGO_PROJECT_ID=<your_project_id> \
  health-assistant
```

---

### Option 5: Google Cloud Run

**Setup:**
1. Create GCP project
2. Install Google Cloud CLI
3. Authenticate: `gcloud auth login`

**Deploy:**
```bash
gcloud run deploy health-assistant \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars LINGO_API_KEY=<your_api_key>,LINGO_PROJECT_ID=<your_project_id>
```

---

### Option 6: Azure Container Instances

**Setup:**
1. Create Azure account
2. Install Azure CLI: `curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash`
3. Authenticate: `az login`

**Deploy:**
```bash
az container create \
  --resource-group myResourceGroup \
  --name health-assistant \
  --image yourusername/health-assistant:latest \
  --ports 8000 \
  --environment-variables LINGO_API_KEY=<your_api_key> LINGO_PROJECT_ID=<your_project_id>
```

---

### Option 7: Vercel (Frontend) + Any Backend

**Frontend to Vercel:**
1. Push frontend code to separate repo
2. Import to [Vercel.com](https://vercel.com)
3. Set `REACT_APP_BACKEND_URL` environment variable
4. Auto-deploys on push

**Backend separately** (use any of the above options)

---

## 🔄 GitHub Actions CI/CD

Your project has automatic deployment configured.

**Add these secrets to GitHub:**
1. Go to: Settings → Secrets and variables → Actions
2. Add:
   - `LINGO_API_KEY`: Your Lingo.dev API key
   - `LINGO_PROJECT_ID`: Your project ID
   - `OPENAI_API_KEY`: Your OpenAI key
   - `GROQ_API_KEY`: Your Groq key
   - `RAILWAY_TOKEN` (if using Railway)
   - `HEROKU_API_KEY` (if using Heroku)

**Auto-deploy on push:**
```bash
git add .
git commit -m "Deploy to production"
git push origin main  # Triggers automatic deployment
```

---

## 📊 Environment Variables Checklist

Required for all deployments:
- [ ] `LINGO_API_KEY` - From Lingo.dev
- [ ] `LINGO_PROJECT_ID` - Your project ID
- [ ] `OPENAI_API_KEY` - (optional, for fallback translations)
- [ ] `GROQ_API_KEY` - (optional)

Frontend specific:
- [ ] `REACT_APP_BACKEND_URL` - Your deployed backend URL

---

## 🧪 Test Your Deployment

After deployment, verify:

1. **Backend health check:**
   ```bash
   curl https://your-app.com/health
   ```

2. **Translation endpoint:**
   ```bash
   curl -X POST https://your-app.com/translate \
     -H "Content-Type: application/json" \
     -d '{"text":"Hello","target_language":"hi"}'
   ```

3. **Frontend loading:**
   - Visit `https://your-app.com` in browser
   - Check browser console for errors

---

## 🛠️ Troubleshooting

### "Port already in use"
```bash
docker run -p 9000:8000 health-assistant
# Access at localhost:9000
```

### "CORS errors"
Check `backend/app.py` for CORS configuration.

### "API key not found"
Ensure environment variables are set:
```bash
# For Docker
echo $LINGO_API_KEY  # Should not be empty

# For cloud platforms
# Check platform's env var dashboard
```

### "Translations not syncing"
1. Verify API credentials in Lingo.dev
2. Check internet connectivity
3. Review logs

---

## 🔐 Security Best Practices

1. **Never commit secrets** to git:
   ```bash
   # Verify .gitignore includes
   echo ".env" >> .gitignore
   git rm --cached .env
   ```

2. **Use platform secrets**, not .env files

3. **Enable HTTPS** (most platforms do automatically)

4. **Restrict CORS** to your domain only

5. **Rotate API keys** regularly

---

## 📈 Monitoring

After deployment, monitor:
- Application logs
- Error rates
- Response times
- API quota usage (Lingo.dev, OpenAI, Groq)

---

## 🚀 Next Steps

1. Choose deployment platform
2. Set up secrets in platform
3. Push to main branch
4. Watch deployment complete
5. Test deployed application
6. Monitor performance
