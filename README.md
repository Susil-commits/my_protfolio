# Susil Kumar Nayak · Portfolio

A responsive, animated personal portfolio built with React, Vite, and Tailwind CSS — showcasing full-stack projects, experience, education, achievements, and certifications.

## Tech Stack

- **React 19** + **Vite 8** (React Compiler enabled)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **tsparticles** for the animated particle background
- **Web3Forms** for the contact form (serverless, no backend required)

## Sections

- **Hero** — animated name reveal, rotating roles, count-up stats
- **About** — recruiter-focused narrative + highlight chips
- **Skills** — categorized tech stack cards
- **Projects** — full-stack platforms with GitHub & live-demo links
- **Experience** — timeline with expandable certificate previews
- **Education** — academic background cards
- **Achievements** — awards with certificate lightbox
- **Certifications** — bootcamp certificates with image preview
- **Contact** — validated form + direct contact info

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Environment Variables

The contact form uses [Web3Forms](https://web3forms.com) for serverless email delivery. Copy the example file and add your access key:

```bash
cp .env.example .env.local
```

```
VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

> Get a free key at https://web3forms.com — enter your email and they mail it to you. No account needed.

## Deployment

The project is configured for **Vercel** via `vercel.json` (SPA rewrites + cache headers). Set `VITE_WEB3FORMS_ACCESS_KEY` in the Vercel project settings under Environment Variables.

## Project Structure

```
src/
├── components/      # UI sections (Hero, About, Projects, etc.)
├── context/         # Lightbox provider
├── data/            # Centralized portfolio content (portfolio.js)
├── hooks/           # useMagnetic hook
└── index.css        # Tailwind + custom utilities & animations
```

All personal content (name, projects, experience, skills) lives in `src/data/portfolio.js` — edit that file to update the site.
