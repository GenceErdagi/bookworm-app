```
hwproject
├─ .DS_Store
├
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ backend
│  ├─ Dockerfile
│  ├─ api
│  │  ├─ __init__.py
│  │  ├─ admin.py
│  │  ├─ apps.py
│  │  ├─ management
│  │  │  └─ commands
│  │  │     ├─ import_books.py
│  │  │     ├─ import_users.py
│  │  │     └─ update_covers.py
│  │  ├─ migrations
│  │  │  ├─ 0001_initial.py
│  │  │  ├─ 0002_book_cover_image.py
│  │  │  └─ __init__.py
│  │  ├─ models.py
│  │  ├─ permissions.py
│  │  ├─ serializers.py
│  │  ├─ tests.py
│  │  ├─ urls.py
│  │  └─ views
│  │     ├─ books.py
│  │     ├─ genres.py
│  │     ├─ reviews.py
│  │     └─ userProfiles.py
│  ├─ books.json
│  ├─ core
│  │  ├─ __init__.py
│  │  ├─ asgi.py
│  │  ├─ settings.py
│  │  ├─ urls.py
│  │  └─ wsgi.py
│  ├─ manage.py
│  ├─ requirements.txt
│  └─ users.json
├─ docker-compose.yml
└─ frontend
   ├─ .eslintrc.json
   ├
   ├─ Dockerfile
   ├─ app
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.tsx
   │  └─ page.tsx
   ├─ components
   │  ├─ Home
   │  │  ├─ Carousel.tsx
   │  │  ├─ Hero.tsx
   │  │  └─ bos.tsx
   │  └─ ui
   │     ├─ button.tsx
   │     ├─ navbar.tsx
   │     └─ star-icon.tsx
   ├─ components.json
   ├─ hooks
   ├─ next-env.d.ts
   ├─ next.config.mjs
   ├─ package.json
   ├─ postcss.config.mjs
   ├─ providers
   │  └─ ReactQueryProvider.tsx
   ├─ public
   │  ├─ next.svg
   │  └─ vercel.svg
   ├─ stores
   ├─ tailwind.config.ts
   ├─ tsconfig.json
   └─ types
      ├─ Book.ts
      ├─ Genre.ts
      ├─ Review.ts
      └─ User.ts
```
