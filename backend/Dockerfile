FROM python:3.11-slim

# set a working directory
WORKDIR /app

# system deps (small, adjust as needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
 && rm -rf /var/lib/apt/lists/*

# copy requirements (requirements.txt must be in backend/)
COPY requirements.txt /app/requirements.txt

# install python deps
RUN pip install --no-cache-dir -r /app/requirements.txt

# copy backend source files from build context (./backend)
COPY . /app

# expose the port uvicorn will listen on
EXPOSE 8000

# run the app (adjust module path if your FastAPI app sits elsewhere)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
