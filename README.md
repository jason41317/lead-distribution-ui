# Lead Distribution Frontend

Frontend application for the Lead Distribution System.

Built with:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod
* TanStack Query

---

## Requirements

* Node.js 22+
* npm
* Git

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd lead-distribution-frontend
```

Install dependencies:

```bash
npm install
```

---

## Environment

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8583/api
```

For production:

```env
NEXT_PUBLIC_API_URL=http://YOUR_BACKEND_URL/api
```

Do not commit `.env.local` to Git.

---

## Run Locally

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Build for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Production with PM2

Start the frontend:

```bash
pm2 start npm --name lead-frontend -- run start
```

Check:

```bash
pm2 status
```

View logs:

```bash
pm2 logs lead-frontend
```

Save PM2:

```bash
pm2 save
```

---

## Deployment

After pulling new changes:

```bash
git pull
npm install
npm run build
pm2 restart lead-frontend
```

If the environment variables were changed, restart the application after the change:

```bash
pm2 restart lead-frontend
```

---

## API Configuration

The frontend communicates with the backend using:

```env
NEXT_PUBLIC_API_URL
```

Example:

```env
NEXT_PUBLIC_API_URL=http://31.97.72.35:8582/api
```

Use the actual public API/proxy URL configured for the production environment.

---

## Useful Commands

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Production:

```bash
npm start
```

PM2:

```bash
pm2 status
pm2 logs lead-frontend
pm2 restart lead-frontend
pm2 save
```
