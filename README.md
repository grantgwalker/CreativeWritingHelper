# Creative Writing Helper

A full-stack web application that helps users practice creative writing by providing classical text excerpts as inspiration. Users can select a writing style, browse through curated excerpts from classical literature, practice writing, and track their daily writing streaks.

## Screenshots

### Home - Writing Type Selection
![Home Page](https://github.com/user-attachments/assets/8186c875-249a-4a00-a0f3-0d92338ff8ef)

### Excerpt Browser
![Excerpt Browser](https://github.com/user-attachments/assets/0ed10d76-2daf-4fc1-98dd-9d4de2092fc4)

### Writing Interface
![Writing Interface](https://github.com/user-attachments/assets/af8e6183-bb13-47ce-992b-b62567d4a92f)

### Completion & Streak Tracking
![Completion Screen](https://github.com/user-attachments/assets/cb1bf4ec-0024-46c8-90e4-530857773a25)

## Features

- 📝 **Writing Type Selection**: Choose from narrative, descriptive, dialogue, poetic, expository, or create custom types
- 📚 **Classical Text Excerpts**: Browse through curated excerpts from famous literary works
- ✍️ **Writing Practice**: Write your own pieces inspired by classical examples
- 🔥 **Streak Tracking**: Keep track of your daily writing streaks and progress
- 💾 **Session Recording**: All writing sessions are saved with word counts and timestamps
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Django 6.0** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Production database (with SQLite fallback for development)
- **Django CORS Headers** - Cross-origin resource sharing

## Project Structure

```
CreativeWritingHelper/
├── backend/               # Django backend
│   ├── api/              # API app (sessions, streaks)
│   ├── texts/            # Texts app (excerpts)
│   ├── writing_helper/   # Main Django project
│   ├── manage.py
│   └── requirements.txt
├── frontend/             # Next.js frontend
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   ├── lib/             # API client and utilities
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL (optional, SQLite used by default)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables (optional):
```bash
cp .env.example .env
# Edit .env with your database settings
```

4. Run database migrations:
```bash
python manage.py migrate
```

5. Load sample classical text excerpts:
```bash
python manage.py loaddata sample_texts
```

6. Start the Django development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# The default settings should work for local development
```

4. Start the Next.js development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Production Build

For production, build the frontend:
```bash
cd frontend
npm run build
npm start
```

## API Endpoints

### Text Excerpts
- `GET /api/excerpts/` - List all excerpts
- `GET /api/excerpts/search/?writing_type={type}` - Search excerpts by writing type

### Writing Sessions
- `GET /api/sessions/` - List all sessions
- `POST /api/sessions/` - Create a new writing session
- `GET /api/sessions/?user_id={id}` - Get sessions for a specific user

### Writing Streaks
- `GET /api/streaks/` - List all streaks
- `GET /api/streaks/current_user/` - Get streak for current user

## Database Models

### TextExcerpt
- Contains classical text excerpts from famous literature
- Fields: title, author, text, writing_type, style, source_work

### WritingSession
- Records each user's writing practice session
- Fields: user, writing_type, excerpt, user_writing, word_count, created_at

### WritingStreak
- Tracks user's daily writing streaks
- Fields: user, current_streak, longest_streak, last_writing_date, total_sessions

## Development

### Adding New Text Excerpts

You can add new excerpts through the Django admin interface:

1. Create a superuser:
```bash
python manage.py createsuperuser
```

2. Access the admin at `http://localhost:8000/admin/`

3. Add new TextExcerpt entries

Or add them via fixtures in `backend/texts/fixtures/`

### Configuring PostgreSQL

To use PostgreSQL instead of SQLite:

1. Set up a PostgreSQL database
2. Update your `.env` file:
```
USE_POSTGRES=true
DB_NAME=writing_helper_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
