# Bookworm App

## Introduction

Bookworm App is a full-stack application designed for book enthusiasts to explore, review, and manage a personal library of books. The backend is built using Django, Django REST Framework and Postgresql, while the frontend leverages React.js and Next.js, offering a responsive and interactive user experience.

## Features Checklist

- [x] User login and authentication
- [x] Book listing and detailed view
- [x] User profile management
- [x] Reviews and ratings for books
- [x] Search functionality for books
- [x] Importing book data from JSON
- [x] Update book cover images
- [x] Docker support for easy deployment
- [] Zod integration for validating forms
- [] A CMS for editors different from Django Admin system

## Installation

### Prerequisites

- Docker
- Docker Compose

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Build the Docker container:

```sh
   docker build -t bookworm-backend .
```

3. Run the container using:

```sh
   docker-compose up
```

### Frontend Setup

1. Navigate to the frontend directory:

```sh
   cd ../frontend
```

2. Build the Docker container:

```sh
   docker build -t bookworm-frontend .
```

3. Start the frontend application:

```sh
   docker-compose up
```

## Usage

1. Open your web browser and navigate to http://localhost:3000 to access the frontend.
2. Use the Django admin application to register, login, browse books, and submit reviews (http://localhost:8000/admin).
