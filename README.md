# DevBio

DevBio is a high-performance, developer-focused personal landing page builder. It allows engineers to create premium, interactive, and high-conversion bio pages with built-in analytics, project showcases, and custom themes.

![License](https://img.shields.io/badge/license-AGPL--3.0-orange.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

---

## Features

- **Advanced Analytics**: Track profile views, link clicks, and geographic distribution with interactive charts.
- **Premium Themes**: Choose from 20+ preset themes (Onyx, Aurora, Matrix, etc.) or create your own.
- **Primary Action (CTA)**: Optimized footer section with "Smart Link" technology (auto-detects emails and URLs).
- **Project Showcase**: Beautifully display your GitHub repositories and professional projects.
- **Status Indicators**: Real-time "Current Status" badges (Available, Deep Work, Out of Office).
- **Sleek Layout**: Modern, responsive design that looks stunning on every device.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (Turbopack)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database / Auth**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: React Icons / Lucide

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/devtofunmi/devbio
cd devbio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Run the SQL commands found in `SETUP_DB.sql` in your Supabase SQL Editor to initialize the required tables and RLS policies.

### 5. Run the dev server
```bash
npm run dev
```

---

## Screenshots

*(Add your screenshots here after deployment)*

---

## Contributing

We welcome contributions! Please check out our [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## License

DevBio is open-source software licensed under the [GNU AGPLv3 License](LICENSE). 