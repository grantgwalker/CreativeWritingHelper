# Quick Start Guide

## Option 1: Docker (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/grantgwalker/CreativeWritingHelper.git
cd CreativeWritingHelper

# Start all services (frontend, backend, and PostgreSQL)
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api/
# Django Admin: http://localhost:8000/admin/
```

The first time you run this, Docker will:
1. Build the frontend and backend images
2. Start PostgreSQL database
3. Run database migrations
4. Load sample text excerpts
5. Start both servers

## Option 2: Local Development

### Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Load sample data
python manage.py loaddata sample_texts

# Start server
python manage.py runserver
```

Backend will be available at http://localhost:8000

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at http://localhost:3000

## Option 3: Development with Docker Database Only

If you want to develop locally but use PostgreSQL in Docker:

```bash
# Start only the database
docker-compose -f docker-compose.dev.yml up

# In another terminal, run backend
cd backend
export USE_POSTGRES=true
python manage.py migrate
python manage.py loaddata sample_texts
python manage.py runserver

# In another terminal, run frontend
cd frontend
npm run dev
```

## First Time Setup

After starting the application for the first time:

1. Navigate to http://localhost:3000
2. Select a writing type (e.g., "Narrative")
3. Browse through classical text excerpts
4. Click "Practice with This" on an excerpt you like
5. Write your own piece inspired by the example
6. Submit your writing to start your streak!

## Accessing Django Admin

To manage text excerpts and view sessions:

```bash
# Create a superuser account
cd backend
python manage.py createsuperuser

# Access admin at http://localhost:8000/admin/
```

## Troubleshooting

### Port already in use
If ports 3000 or 8000 are already in use, you can modify the ports in `docker-compose.yml` or stop the conflicting services.

### Database connection errors
If using PostgreSQL, ensure the database is running and credentials match your `.env` file.

### Frontend can't connect to backend
Verify that `NEXT_PUBLIC_API_URL` in `frontend/.env.local` points to your backend URL (default: http://localhost:8000/api)

## Next Steps

- Add more text excerpts through the Django admin
- Customize the writing types in the frontend
- Set up PostgreSQL for production
- Deploy to your hosting platform

For more detailed information, see [README.md](README.md)
