# Chattogram Airport High School - Web Portal & Administration System

An integrated, full-stack school management system and official web portal for Chattogram Airport High School (চট্টগ্রাম বিমানবন্দর উচ্চ বিদ্যালয়).

## Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion, React Router v7.
- **Backend Services**: Supabase PostgreSQL database, Row Level Security (RLS), Supabase Auth, Edge Functions, and Express server for API routing.
- **Database Migrations**: Located in `backend/supabase/migrations/` (12 structured migrations + seed dataset).

## Features

- **Public Portal**: Notices, Events, Media Gallery, Admissions, Managing Committee, Academic Downloads, Timetables, Online Fees.
- **Administration Modules**:
  - Teacher Management (Faculty directory, attendance logs, leave processing, routine assignments, portal credentials).
  - Student Information System (Enrollment, sectioning, daily attendance, grade reports).
  - Noticeboard & Announcement Publisher.
  - Academic Routine Scheduler & Calendar.
  - Media & Download Asset Manager.
  - School Settings & EIIN Configuration.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```
