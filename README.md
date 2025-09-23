# Bobyard Fullstack Challenge

## Overview
This project implements a comment system similar to YouTube/Reddit, featuring a Django REST Framework backend with PostgreSQL (`bobyard_db`) and a React frontend. It supports listing, adding, editing, and deleting comments, with data seeded from the provided JSON file.

## Tech Stack
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Frontend**: React, Axios
- **Database**: PostgreSQL (`bobyard_db`)

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL (create database: `createdb bobyard_db`)

### Backend Setup
1. Navigate to backend: `cd backend`
2. Create and activate virtual environment:
   - Linux/macOS: `python -m venv venv && source venv/bin/activate`
   - Windows: `python -m venv venv && venv\Scripts\activate`
3. Install dependencies: `pip install -r ../requirements.txt`
4. Update `backend/settings.py` with your PostgreSQL credentials if needed:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'bobyard_db',
           'USER': 'your_postgres_user',
           'PASSWORD': 'your_postgres_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```
5. Run migrations: `python manage.py makemigrations && python manage.py migrate && python manage.py seed_comments`
7. Start server: `python manage.py runserver`
   - API available at `http://localhost:8000/api/comments/`
   - Admin interface at `http://localhost:8000/admin`

### Frontend Setup
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start app: `npm start`
   - Runs at `http://localhost:3000`, proxies API calls to backend

