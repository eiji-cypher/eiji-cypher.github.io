# Double V Business Support Services — Client Portal

A full-stack web application for Double V Business Support Services built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **NextAuth**.

---

## 🎨 Brand Identity
- **Colors**: Navy `#0D1B5E` · Blue `#1A3A8F` · Royal `#2B4FC7` · Silver `#C0C8D8`
- **Fonts**: Bebas Neue (headings) · Montserrat (body)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (Google + Credentials) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## 📁 Project Structure

```
doublevbss/
├── app/
│   ├── page.tsx                   # Public homepage
│   ├── login/page.tsx             # Login page
│   ├── register/page.tsx          # Registration page
│   ├── dashboard/
│   │   ├── layout.tsx             # Dashboard shell + sidebar
│   │   ├── page.tsx               # Dashboard overview
│   │   ├── documents/page.tsx     # Document tracking
│   │   ├── new-request/page.tsx   # Submit new request
│   │   └── settings/page.tsx      # Account settings
│   └── api/
│       ├── auth/[...nextauth]/    # NextAuth endpoints
│       ├── auth/register/         # User registration
│       ├── contact/               # Contact form
│       └── documents/             # Document CRUD
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Rates.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── Providers.tsx
├── lib/
│   ├── auth.ts                    # NextAuth config
│   └── prisma.ts                  # Prisma client
└── prisma/
    └── schema.prisma              # Database schema
```

---

## 🚀 Setup & Installation

### 1. Clone and install dependencies
```bash
cd doublevbss
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your values:
- `DATABASE_URL` — your PostgreSQL connection string
- `NEXTAUTH_SECRET` — run `openssl rand -base64 32` to generate
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from Google Cloud Console

### 3. Set up Google OAuth
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API** / **Google Identity**
4. Create OAuth 2.0 credentials (Web Application)
5. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://yourdomain.com/api/auth/callback/google` (prod)

### 4. Set up the database
```bash
# Push schema to database
npx prisma db push

# Or run migrations
npx prisma migrate dev --name init

# Seed admin user (optional)
npx prisma studio  # Open Prisma Studio to manage data
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄 Database Schema

Key models:
- **User** — client accounts (linked to NextAuth)
- **Document** — tracked filings with status workflow
- **ServiceRequest** — client service requests
- **ContactMessage** — from public contact form

Document statuses:
```
PENDING → PROCESSING → AWAITING_REQUIREMENTS → READY_FOR_RETRIEVAL → RETRIEVED
                                                                    ↓
                                                                CANCELLED
```

---

## 🌐 Pages

| Route | Description |
|---|---|
| `/` | Public homepage with services, rates, certifications, contact |
| `/login` | Client login (Google or email) |
| `/register` | New client registration |
| `/dashboard` | Overview with stats and recent docs |
| `/dashboard/documents` | Full document list with status tracking |
| `/dashboard/new-request` | Submit new service request |
| `/dashboard/settings` | Profile and notification settings |

---

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel Dashboard → Settings → Environment Variables.

### Database Options
- **Supabase** (free PostgreSQL) — recommended
- **Railway** — simple PostgreSQL hosting
- **PlanetScale** (MySQL — requires schema changes)
- **Neon** — serverless PostgreSQL

---

## 🔮 Future Additions (Requested)
- [ ] Admin panel for staff to update document statuses
- [ ] Email notifications via Nodemailer
- [ ] File upload for client document submissions
- [ ] SMS notifications via Twilio
- [ ] Payment integration for service fees
- [ ] Appointment scheduling system
- [ ] Mobile app (React Native)

---

## 📞 Contact
- Email: doublevdipolog@gmail.com
- Phone: 0970-686-7170 / 0951-492-140
