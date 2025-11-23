# 🧵 Weave – AI Cover Letter Generator

Weave is an AI-powered web application that generates **professionally tailored cover letters** using your **resume + job description** in seconds.  
It aligns your experience with job requirements, formats the letter cleanly, and provides a beautiful, responsive interface.

---

## 📷 Preview
<img width="1889" height="909" alt="Screenshot 2025-11-22 203640" src="https://github.com/user-attachments/assets/2bfb8fb4-1e1a-4bc5-a9cc-3aecbe7c886d" />


## 🚀 Features

### 🔹 AI Features
- 🤖 **AI-Generated Cover Letters** using **Gemini 2.5 Pro**
- 📄 **Resume Parsing** (PDF → text extraction)
- 📝 **Job Description Analysis**
- 🎭 **Multiple Tone Styles** — Formal, Confident, Friendly
- ✨ **Highly personalized output** aligned with your skills & the JD

### 🔹 Application Features
- 💾 Save & manage generated cover letters
- 🔐 **User Authentication** (NextAuth.js)
- 🎨 Modern UI with **Tailwind CSS**
- 🎞 Smooth animations using **Framer Motion** 
- 🧭 Responsive Pages

---

## 🏗️ Tech Stack

### **Frontend**
- Next.js 16 (App Router)
- Tailwind CSS
- TypeScript
- Framer Motion
- Lucide Icons

### **Backend**
- Next.js API Routes
- Prisma ORM
- PostgreSQL (NeonDB)
- NextAuth.js (Credentials / OAuth support)

### **AI**
- Google Gemini 2.5 Pro  
- `generateContent` API for cover letter generation
---

### Environment Variables
```bash
NEXTAUTH_URL=your_vercel_url
NEXTAUTH_SECRET=your_generated_secret

DATABASE_URL=your_neondb_postgres_url

GEMINI_API_KEY=your_gemini_api_key
```

---

### Run Locally
```bash
 npm install

 npx prisma generate
 npx prisma migrate dev

npm run dev 
```

### Deployement
- Deployed on Vercel
